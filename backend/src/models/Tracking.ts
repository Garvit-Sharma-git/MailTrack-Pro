import mongoose, { Schema, Document } from 'mongoose';


export interface ITracking extends Document {
userId: string;
email: string;           // recipient email
messageId?: string;
openCount: number;
createdAt: Date;
lastSeenAt?: Date;
}


const TrackingSchema = new Schema<ITracking>({
userId: { type: String, required: true, index: true },
email: { type: String, required: true },
messageId: { type: String, required: false, index: true },
openCount: { type: Number, default: 0, required: true },
lastSeenAt: { type: Date, default: null },
}, { timestamps: { createdAt: 'createdAt' } });


export default mongoose.model<ITracking>('Tracking', TrackingSchema);t