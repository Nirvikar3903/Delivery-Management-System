import mongoose, { Schema, Document } from 'mongoose';

export interface IPartner extends Document {
  name: string;
  email: string;
  phone: string;
  status: 'active' | 'inactive';
  availability: 'available' | 'busy' | 'offline'; // New field
  currentLoad: number;
  areas: string[];
  shift: {
    start: string;
    end: string;
  };
  metrics: {
    rating: number;
    completedOrders: number;
    cancelledOrders: number;
  };
  assignmentHistory: mongoose.Types.ObjectId[]; // New field
}

const PartnerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: String,
  phone: String,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  availability: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'offline',
  },
  currentLoad: { type: Number, default: 0 },
  areas: [String],
  shift: {
    start: String,
    end: String,
  },
  metrics: {
    rating: { type: Number, default: 0 },
    completedOrders: { type: Number, default: 0 },
    cancelledOrders: { type: Number, default: 0 },
  },
  assignmentHistory: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Order',
    },
  ],
});

export default mongoose.model<IPartner>('Partner', PartnerSchema);
