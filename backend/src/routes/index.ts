import { Router } from 'express';
import pixelRoutes from './pixel.routes';
import authRoutes from "./auth.routes";
import trackingRoutes from "./tracking.routes";


const router = Router();

router.use("/auth", authRoutes);
router.use("/tracking", trackingRoutes);
router.use('/pixel', pixelRoutes);


export default router;