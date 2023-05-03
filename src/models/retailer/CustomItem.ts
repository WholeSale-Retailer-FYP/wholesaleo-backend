import mongoose, { Schema } from "mongoose";

export interface ICustomItem {
  _id: mongoose.Types.ObjectId;
  name: string;
  retailerId: mongoose.Types.ObjectId;
  customCategoryId: mongoose.Types.ObjectId;
  image: string;
}

const CustomItemSchema: Schema<ICustomItem> = new Schema({
  _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  retailerId: { type: Schema.Types.ObjectId, ref: "Retailer", required: true },
  image: {
    type: String,
    required: true,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2YQz36i4j0vszGg7Tlyo5kDPUEmcSmAjtJi7BetjBwh0ufwy1tVlsmIvc3o8wwWn0AY0&usqp=CAU",
  },
  customCategoryId: {
    type: Schema.Types.ObjectId,
    ref: "CustomCategory",
    required: true,
  },
});

export default mongoose.model<ICustomItem>("CustomItem", CustomItemSchema);
