import mongoose, { Document, Schema } from "mongoose";
// TODO: add controller and route
enum Status {
  InProgress = 1,
  Urgent,
  Complete,
}

export interface IRegion {
  retailerId: string;
  warehouseId: mongoose.Types.ObjectId;
  status: Status;
  description: string;
}

export interface IRegionModel extends IRegion, Document {}

const RegionSchema: Schema = new Schema({
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
});

export default mongoose.model<IRegionModel>("Region", RegionSchema);
