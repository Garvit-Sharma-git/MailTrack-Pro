import { Router } from "express";
import { pixelTracker, createTracking, getTrackingEvents } from "../controllers/trackingController";
import { authMiddleware } from "../middleware/auth.middleware";


const router = Router();

// Pixel tracking endpoint (no auth needed)
router.get("/pixel", pixelTracker);

// Create tracking record (auth required)
router.post("/create", authMiddleware, createTracking);

// Get all tracking records for a user (auth required)
router.get("/user/:userId", authMiddleware, getTrackingEvents);

export default router;
