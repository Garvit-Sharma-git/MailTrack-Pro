import mongoose from 'mongoose';


export const connectDatabase = async () => {
const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/email-tracker';
await mongoose.connect(uri, { autoIndex: true });
console.log('MongoDB connected');
};