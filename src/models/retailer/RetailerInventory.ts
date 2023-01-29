import mongoose, { Document, Schema } from "mongoose";

export interface IRetailerInventory {
  quantity: number;
  weight: number;
  originalPrice: number;
  sellingPrice: number;
  barcodeId: string;
  retailerId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId;
}

export interface IRetailerInventoryModel extends IRetailerInventory, Document {}

const RetailerInventorySchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  weight: { type: Number, required: true },
  barcodeId: { type: String, required: true },
  retailerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Retailer",
  },
  itemId: { type: Schema.Types.ObjectId, required: true, ref: "Item" },
});

export default mongoose.model<IRetailerInventoryModel>(
  "RetailerInventory",
  RetailerInventorySchema
);
