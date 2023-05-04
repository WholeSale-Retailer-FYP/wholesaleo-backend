import mongoose, { Document, Schema } from "mongoose";

interface DocumentResult<T> {
  _doc: T;
}

export interface IItemCategory extends DocumentResult<IItemCategory> {
  name: string;
  image: string;
  custom?: boolean;
}

export interface IItemCategoryModel extends IItemCategory, Document {}

const ItemCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
});

export default mongoose.model<IItemCategoryModel>(
  "ItemCategory",
  ItemCategorySchema
);
