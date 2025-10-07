import { Request, Response } from "express";
import OpenEvent from "../models/OpenEvent";
import path from "path";
import Tracking from "../models/Tracking";


// Tracking pixel endpoint
export const pixelTracker = async (req: Request, res: Response) => {
  try {
    const { trackingId, metadata } = req.query;

    if (!trackingId) {
      return res.status(400).send("Missing trackingId");
    }

    // Create open event
    await OpenEvent.create({
      trackingId: trackingId as string,
      ip: req.ip,
      ua: req.headers["user-agent"],
      headers: req.headers,
      metadata: req.query.metadata || null, // optional extra info
      seenAt: new Date(),
    });

     await Tracking.findByIdAndUpdate(trackingId, {
      $inc: { openCount: 1 },
      lastSeenAt: new Date(),
    });

    // Send 1x1 transparent GIF
    const filePath = path.join(__dirname, "../../public/pixel.gif");
    res.sendFile(filePath);
  } catch (err) {
    console.error("Pixel tracking error:", err);
    res.status(500).send("Error tracking pixel");
  }
};

export const createTracking = async (req: Request, res: Response) => {
  try {
    const { email, userId, messageId } = req.body;

    if (!email || !userId) {
      return res.status(400).json({ message: "Missing required fields: email or userId" });
    }

    const tracking = await Tracking.create({
      email,
      userId,
      messageId,
      openCount: 0,
      lastSeenAt: null,
    });

    // Construct pixel URL
    const baseUrl = process.env.BACKEND_URL || "http://localhost:4000";
    const pixelUrl = `${baseUrl}/api/tracking/pixel?trackingId=${tracking._id}`;

    res.json({
      trackingId: tracking._id,
      pixelUrl,
      message: "Tracking link created successfully",
    });
  } catch (err) {
    console.error("Error creating tracking:", err);
    res.status(500).json({ message: "Error creating tracking" });
  }
};

// Optional: Get all tracking records for a user with summary analytics
export const getTrackingEvents = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const trackings = await Tracking.find({ userId }).lean();

    res.json(trackings);
  } catch (err) {
    console.error("Error fetching tracking events:", err);
    res.status(500).json({ message: "Error fetching tracking events" });
  }
};