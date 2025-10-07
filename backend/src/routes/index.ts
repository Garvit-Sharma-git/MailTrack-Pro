import { Router } from 'express';
import pixelRoutes from './pixel.routes';
import authRoutes from "./auth.routes";
const router = Router();
router.use("/auth", authRoutes);



router.use('/pixel', pixelRoutes);


export default router;