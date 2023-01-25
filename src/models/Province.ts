import mongoose, { Document, Schema } from "mongoose";

export interface IProvince {
  name: string;
}

export interface IProvinceModel extends IProvince, Document {}

const ProvinceSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IProvinceModel>("Province", ProvinceSchema);
