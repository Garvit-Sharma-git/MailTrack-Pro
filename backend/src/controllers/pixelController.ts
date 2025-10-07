import { Request, Response, NextFunction } from 'express';
import { recordOpenEvent } from '../services/pixelService';


// 1x1 transparent GIF base64 (smallest cross-client compatible)
const GIF_1x1_BASE64 = 'R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';
const GIF_BUFFER = Buffer.from(GIF_1x1_BASE64, 'base64');


export const servePixel = async (req: Request, res: Response, next: NextFunction) => {
try {
const id = String(req.query.id || req.query.t || '');
const remoteIp = req.ip || req.socket.remoteAddress || null;
const ua = req.get('user-agent') || null;


// record event (doesn't block response)
recordOpenEvent({ trackingId: id, ip: remoteIp, ua, headers: req.headers }).catch(console.error);


res.set('Content-Type', 'image/gif');
res.set('Cache-Control', 'no-cache, no-store, must-revalidate');
res.set('Pragma', 'no-cache');
res.set('Expires', '0');
res.status(200).send(GIF_BUFFER);
} catch (err) {
next(err);
}
};


export const trackOpen = async (req: Request, res: Response, next: NextFunction) => {
try {
const { id, metadata } = req.body;
await recordOpenEvent({ trackingId: id, metadata });
res.json({ ok: true });
} catch (err) {
next(err);
}
};