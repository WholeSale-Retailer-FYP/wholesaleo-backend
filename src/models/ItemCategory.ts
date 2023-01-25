import mongoose, { Document, Schema } from "mongoose";

export interface IItemCategory {
  name: string;
}

export interface IItemCategoryModel extends IItemCategory, Document {}

const ItemCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IItemCategoryModel>(
  "ItemCategory",
  ItemCategorySchema
);
