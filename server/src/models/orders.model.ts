import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  customerName: string;
  address: string;
  area: string;
  status: 'pending' | 'assigned' | 'delivered' | 'cancelled';
  deliveryTime: Date;
  assignedPartner?: mongoose.Types.ObjectId;
}

const OrderSchema: Schema = new Schema({
  customerName: { type: String, required: true },
  address: { type: String, required: true },
  area: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'assigned', 'delivered', 'cancelled'],
    default: 'pending',
  },
  deliveryTime: { type: Date, required: true },
  assignedPartner: { type: Schema.Types.ObjectId, ref: 'Partner' },
});

export default mongoose.model<IOrder>('Order', OrderSchema);
