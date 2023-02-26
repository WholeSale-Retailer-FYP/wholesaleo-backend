import mongoose, { Document, Schema } from "mongoose";

export interface ISection {
  name: string;
  capacity: number;
  currentQuantity: number;
  warehouseId: mongoose.Types.ObjectId;
}

export interface ISectionModel extends ISection, Document {}

const SectionSchema: Schema = new Schema({
  name: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentQuantity: { type: Number, required: false, default: 0 },
  warehouseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Warehouse",
  },
});

export default mongoose.model<ISectionModel>("Section", SectionSchema);
