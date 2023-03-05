import mongoose, { Document, Schema } from "mongoose";

enum ShopSize {
  SINGLE = 0, //"1 Employee",
  SMALL = 1, //"2-10 Employees",
  MEDIUM = 2, //"11-50 Employees",
  LARGE = 3, //"50+ Employees",
}

export interface IRetailer {
  shopName: boolean;
  postalCode: number;
  longitude: number;
  latitude: number;
  verified: boolean;
  address: string;

  regionId: mongoose.Types.ObjectId;
  warehouseId: mongoose.Types.ObjectId;
  amountPayable: number;
  shopSize: ShopSize;
}

export interface IRetailerModel extends IRetailer, Document {}

const RetailerSchema: Schema = new Schema({
  shopName: { type: String, required: true },
  postalCode: { type: Number, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  verified: { type: Boolean, default: false },
  address: { type: String, required: true },
  regionId: { type: Schema.Types.ObjectId, ref: "Region", required: true },
  warehouseId: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
  shopSize: { type: Number, enum: ShopSize, required: true },
});

export default mongoose.model<IRetailerModel>("Retailer", RetailerSchema);
