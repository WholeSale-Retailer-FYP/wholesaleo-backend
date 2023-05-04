import mongoose, { Document, Schema } from "mongoose";

interface DocumentResult<T> {
  _doc: T;
}
export interface ICustomCategory extends DocumentResult<ICustomCategory> {
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
  image: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaxJvY4-LsDnXKj22dHmIUWHUWYdpe3L018UL81t5p9w&s",
  },
});

export default mongoose.model<ICustomCategory>(
  "CustomCategory",
  CustomCategorySchema
);
