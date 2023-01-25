import mongoose, { Document, Schema } from "mongoose";

export interface IRegion {
  name: string;
}

export interface IRegionModel extends IRegion, Document {}

const RegionSchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IRegionModel>("Region", RegionSchema);
