import mongoose, { Schema, Document } from 'mongoose';

export interface IAssignment extends Document {
  orderId: mongoose.Types.ObjectId;
  partnerId: mongoose.Types.ObjectId;
  assignedAt: Date;
}

const AssignmentSchema = new Schema({
  orderId: { type: Schema.Types.ObjectId, ref: 'Order', required: true },
  partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
  assignedAt: { type: Date, default: Date.now }
});

export default mongoose.model<IAssignment>('Assignment', AssignmentSchema);
