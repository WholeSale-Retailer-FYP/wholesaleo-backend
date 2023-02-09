import mongoose, { Document, Schema } from "mongoose";

export interface ICity {
  name: string;
  provinceId: mongoose.Types.ObjectId;
}

export interface ICityModel extends ICity, Document {}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
  provinceId: { type: Schema.Types.ObjectId, ref: "Province", required: true },
});

export default mongoose.model<ICityModel>("City", CitySchema);
