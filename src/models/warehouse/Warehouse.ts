import mongoose, { Document, Schema } from "mongoose";
import { IWarehouseEmployee } from "./WarehouseEmployee";

export interface IWarehouse {
  name: string;
  cityId: mongoose.Types.ObjectId;
  regionId: mongoose.Types.ObjectId;
  provinceId: mongoose.Types.ObjectId;
  verified: boolean;
  longitude: number;
  latitude: number;
}

export interface IWarehouseModel extends IWarehouse, Document {}

const WarehouseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    cityId: { type: Schema.Types.ObjectId, required: true, ref: "City" },
    regionId: { type: Schema.Types.ObjectId, required: true, ref: "Region" },
    provinceId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Province",
    },
    verified: { type: Boolean, default: false },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IWarehouseModel>("Warehouse", WarehouseSchema);
