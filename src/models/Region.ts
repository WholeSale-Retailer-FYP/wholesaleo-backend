import mongoose, { Document, Schema } from "mongoose";

export interface IRegion {
  name: string;
  cityId: mongoose.Types.ObjectId;
}

export interface IRegionModel extends IRegion, Document {}

const RegionSchema: Schema = new Schema({
  name: { type: String, required: true },
  cityId: { type: Schema.Types.ObjectId, ref: "City", required: true },
});

export default mongoose.model<IRegionModel>("Region", RegionSchema);
