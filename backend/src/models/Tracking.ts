import mongoose, { Schema, Document } from 'mongoose';


export interface ITracking extends Document {
userId: string;
messageId?: string;
openCount: number;
createdAt: Date;
lastSeenAt?: Date;
}


const TrackingSchema = new Schema<ITracking>({
userId: { type: String, required: true, index: true },
messageId: { type: String, required: false, index: true },
openCount: { type: Number, default: 0 },
lastSeenAt: { type: Date },
}, { timestamps: { createdAt: 'createdAt' } });


export default mongoose.model<ITracking>('Tracking', TrackingSchema);