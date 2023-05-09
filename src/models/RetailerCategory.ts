import mongoose, { Document, Schema } from "mongoose";

export interface IRetailerCategory {
  name: string;
}

export interface IRetailerCategoryModel extends IRetailerCategory, Document {}

const RetailerCategorySchema: Schema = new Schema({
  name: { type: String, required: true },
});

export default mongoose.model<IRetailerCategoryModel>(
  "RetailerCategory",
  RetailerCategorySchema
);
