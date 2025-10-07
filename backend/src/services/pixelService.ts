import TrackingModel from '../models/Tracking';
import OpenEventModel from '../models/OpenEvent';
import { getIo } from '../config/socket';


export const recordOpenEvent = async ({ trackingId, ip, ua, headers, metadata }: any) => {
if (!trackingId) return null;


// create/open event
const open = await OpenEventModel.create({ trackingId, ip, ua, headers, metadata, seenAt: new Date() });


// increment open count on Tracking
await TrackingModel.findOneAndUpdate(
{ _id: trackingId },
{ $inc: { openCount: 1 }, $set: { lastSeenAt: open.seenAt } },
{ upsert: false }
);


// emit socket event to user (if connected)
try {
const io = getIo();
io.to(`user_${trackingId}`).emit('open', { trackingId, seenAt: open.seenAt });
} catch (e) {
// socket may not be initialized or user not connected
}


return open;
};