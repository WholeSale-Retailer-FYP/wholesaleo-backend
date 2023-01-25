import mongoose, { Document, Schema } from "mongoose";
import { IWarehouseEmployee } from "./WarehouseEmployee";

export interface IWarehouse {
  name: string;
  city: mongoose.Types.ObjectId;
  region: mongoose.Types.ObjectId;
  province: mongoose.Types.ObjectId;
  verified: boolean;
  longitude: number;
  latitude: number;
  //   TODO: make employees table and define array type
}

export interface IWarehouseModel extends IWarehouse, Document {}

const WarehouseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    city: { type: Schema.Types.ObjectId, required: true, ref: "City" },
    region: { type: Schema.Types.ObjectId, required: true, ref: "Region" },
    province: { type: Schema.Types.ObjectId, required: true, ref: "Province" },
    verified: { type: Boolean, default: false },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IWarehouseModel>("Warehouse", WarehouseSchema);
