import mongoose, { Document, Schema } from "mongoose";

export interface IItemType {
  name: string;
  quantity: number;
}

export interface IItemTypeModel extends IItemType, Document {}

const ItemTypeSchema: Schema = new Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IItemTypeModel>("ItemType", ItemTypeSchema);
