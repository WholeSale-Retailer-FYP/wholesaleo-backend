import mongoose, { Document, Schema } from "mongoose";

export interface IItem {
  name: string;
  itemCategoryId: mongoose.Types.ObjectId;
}

export interface IItemModel extends IItem, Document {}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  itemCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ItemCategory",
  },
});

export default mongoose.model<IItemModel>("Item", ItemSchema);