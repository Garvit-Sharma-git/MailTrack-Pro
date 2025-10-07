import mongoose, { Schema, Document } from 'mongoose';


export interface IOpenEvent extends Document {
trackingId: any;
ip?: string | null;
ua?: string | null;
headers?: any;
metadata?: any;
seenAt: Date;
}


const OpenEventSchema = new Schema<IOpenEvent>({
trackingId: { type: Schema.Types.ObjectId, ref: 'Tracking', required: true, index: true },
ip: String,
ua: String,
headers: Schema.Types.Mixed,
metadata: Schema.Types.Mixed,
seenAt: { type: Date, default: Date.now }
});


export default mongoose.model<IOpenEvent>('OpenEvent', OpenEventSchema);