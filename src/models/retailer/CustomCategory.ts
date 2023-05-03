import mongoose, { Document, Schema } from "mongoose";

export interface ICustomCategory {
  _id: mongoose.Types.ObjectId;
  name: string;
  retailerId: mongoose.Types.ObjectId;
  custom?: boolean;
  image: string;
}

const CustomCategorySchema: Schema<ICustomCategory> = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  retailerId: { type: Schema.Types.ObjectId, ref: "Retailer", required: true },
  image: { type: String },
});

export default mongoose.model<ICustomCategory>(
  "CustomCategory",
  CustomCategorySchema
);
