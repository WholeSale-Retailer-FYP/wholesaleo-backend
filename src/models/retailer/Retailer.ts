import mongoose, { Document, Schema } from "mongoose";
// TODO: Account Payable implementation
export interface IRetailer {
  firstName: string;
  lastName: string;
  cnic: string;
  phoneNumber: string;
  shopName: boolean;
  postalCode: number;
  longitude: number;
  latitude: number;
  verified: boolean;
  provinceId: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
  regionId: mongoose.Types.ObjectId;
  warehouseId: mongoose.Types.ObjectId;
}

export interface IRetailerModel extends IRetailer, Document {}

const RetailerSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  cnic: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true, unique: true },
  shopName: { type: String, required: true },
  postalCode: { type: Number, required: true },
  longitude: { type: Number, required: true },
  latitude: { type: Number, required: true },
  verified: { type: Boolean, default: false },
  provinceId: { type: Schema.Types.ObjectId, ref: "Province", required: true },
  cityId: { type: Schema.Types.ObjectId, ref: "City", required: true },
  regionId: { type: Schema.Types.ObjectId, ref: "Region", required: true },
  warehouseId: {
    type: Schema.Types.ObjectId,
    ref: "Warehouse",
    required: true,
  },
});

export default mongoose.model<IRetailerModel>("Retailer", RetailerSchema);
