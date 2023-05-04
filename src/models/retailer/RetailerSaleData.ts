import { object } from "joi";
import mongoose, { Document, Schema } from "mongoose";

export interface IRetailerSaleData {
  retailerInventoryId: mongoose.Types.ObjectId | { sellingPrice: number };
  quantity: number;
  retailerPOSId: mongoose.Types.ObjectId;
}

export interface IRetailerSaleDataModel extends IRetailerSaleData, Document {}

const RetailerSaleDataSchema: Schema = new Schema({
  retailerPOSId: {
    type: Schema.Types.ObjectId,
    ref: "RetailerPOS",
    required: true,
  },
  retailerInventoryId: {
    type: Schema.Types.ObjectId,
    ref: "RetailerInventory",
    required: true,
  },
  quantity: { type: Number, required: true },
});

export default mongoose.model<IRetailerSaleDataModel>(
  "RetailerSaleData",
  RetailerSaleDataSchema
);
