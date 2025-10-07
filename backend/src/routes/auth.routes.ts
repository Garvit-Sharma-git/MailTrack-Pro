import { Router } from "express";
import { googleAuth, googleAuthCallback, getMe } from "../controllers/authController";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

// Step 1: Redirect user to Google OAuth
router.get("/google", googleAuth);

// Step 2: Google callback
router.get("/google/callback", googleAuthCallback);

// Protected route example
router.get("/me", authMiddleware, getMe);

export default router;
