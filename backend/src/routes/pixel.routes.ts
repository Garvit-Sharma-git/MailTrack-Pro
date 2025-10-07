import { Router } from 'express';
import { servePixel, trackOpen } from '../controllers/pixelController';


const router = Router();
// public pixel endpoint used inside emails
router.get('/open', servePixel);
// optionally a route to track webhooks or server-side events
router.post('/track', trackOpen);


export default router;