import mongoose, { Document, Schema } from "mongoose";

export interface IRetailerPurchaseData {
  warehouseInventoryId: mongoose.Types.ObjectId;
  quantity: number;
  retailerPurchaseId: mongoose.Types.ObjectId;
}

export interface IRetailerPurchaseDataModel
  extends IRetailerPurchaseData,
    Document {}

const RetailerPurchaseDataSchema: Schema = new Schema({
  warehouseInventoryId: {
    type: Schema.Types.ObjectId,
    ref: "WarehouseInventory",
    required: true,
  },
  quantity: { type: Number, required: true },
  retailerPurchaseId: {
    type: Schema.Types.ObjectId,
    ref: "RetailerPurchase",
    required: true,
  },
});

export default mongoose.model<IRetailerPurchaseDataModel>(
  "RetailerPurchaseData",
  RetailerPurchaseDataSchema
);
