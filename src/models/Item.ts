import mongoose, { Document, Schema } from "mongoose";

export interface IItem {
  name: string;
  image: string;
  itemCategoryId: mongoose.Types.ObjectId;
  // types: Array<mongoose.Types.ObjectId>;
  types: Array<object>;
}

export interface IItemModel extends IItem, Document {}

const ItemSchema: Schema = new Schema({
  name: { type: String, required: true },
  image: { type: String, required: true },
  itemCategoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "ItemCategory",
  },
  types: [{ type: Object, required: true }],
});

ItemSchema.index({ name: "text" });

export default mongoose.model<IItemModel>("Item", ItemSchema);
