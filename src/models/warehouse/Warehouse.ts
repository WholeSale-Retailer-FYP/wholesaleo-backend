import mongoose, { Document, Schema } from "mongoose";
import { IWarehouseEmployee } from "./WarehouseEmployee";

export interface IWarehouse {
  name: string;
  regionId: mongoose.Types.ObjectId;
  verified: boolean;
  longitude: number;
  latitude: number;
}

export interface IWarehouseModel extends IWarehouse, Document {}

const WarehouseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    regionId: { type: Schema.Types.ObjectId, required: true, ref: "Region" },
    verified: { type: Boolean, default: false },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IWarehouseModel>("Warehouse", WarehouseSchema);
