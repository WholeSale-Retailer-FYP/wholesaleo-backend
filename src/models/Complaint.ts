import mongoose, { Document, Schema } from "mongoose";
// TODO: add controller and route
enum Status {
  InProgress = 1,
  Urgent,
  Complete,
}

export interface IComplaint {
  retailerId: string;
  warehouseId: mongoose.Types.ObjectId;
  status: Status;
  description: string;
}

export interface IComplaintModel extends IComplaint, Document {}

const ComplaintSchema: Schema = new Schema({
  retailerId: { type: Schema.Types.ObjectId, ref: "Retailer", required: true },
  warehouseId: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  status: {
    type: Number,
    enum: Status,
    default: Status.InProgress,
    required: true,
  },
  description: { type: String, required: true },
});

export default mongoose.model<IComplaintModel>("Complaint", ComplaintSchema);
