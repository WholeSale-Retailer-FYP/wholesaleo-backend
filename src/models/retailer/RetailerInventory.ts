import mongoose, { Document, Schema } from "mongoose";

export interface IRetailerInventory {
  quantity: number;
  weight: number;
  originalPrice: number;
  sellingPrice: number;
  barcodeId: string;
  retailerId: mongoose.Types.ObjectId;
  warehouseInventoryId: mongoose.Types.ObjectId;
}

export interface IRetailerInventoryModel extends IRetailerInventory, Document {}

const RetailerInventorySchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  sellingPrice: { type: Number, default: -1 },
  weight: { type: Number, required: true },
  barcodeId: { type: String },
  retailerId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Retailer",
  },
  warehouseInventoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "WarehouseInventory",
  },
});

export default mongoose.model<IRetailerInventoryModel>(
  "RetailerInventory",
  RetailerInventorySchema
);
