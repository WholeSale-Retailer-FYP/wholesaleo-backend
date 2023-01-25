import mongoose, { Document, Schema } from "mongoose";

export interface ICity {
  name: string;
}

export interface ICityModel extends ICity, Document {}

const CitySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<ICityModel>("City", CitySchema);
