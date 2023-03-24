import mongoose, { Document, Schema } from "mongoose";
import { v1 as uuidv1 } from "uuid";

export enum OrderStatus {
  PENDING = 0,
  DISPATCHED,
  COMPLETED,
  CANCELLED,
}

export interface IRetailerPurchase {
  datetime: Date;
  orderNumber: string;
  orderStatus: OrderStatus;
  retailerId: mongoose.Types.ObjectId;
  warehouseId: mongoose.Types.ObjectId;
  numItems: number;
  totalPrice: number;
}

export interface IRetailerPurchaseModel extends IRetailerPurchase, Document {}

const RetailerPurchaseSchema: Schema = new Schema({
  datetime: { type: Date, default: Date.now },
  orderNumber: { type: String, default: uuidv1() },
  orderStatus: {
    type: Number,
    enum: OrderStatus,
    default: OrderStatus.PENDING,
  },
  retailerId: {
    type: Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
  numItems: { type: Number, default: 0, required: true },
  warehouseId: { type: Schema.Types.ObjectId, ref: "Warehouse" },
  totalPrice: { type: Number, default: 0, required: true },
});

export default mongoose.model<IRetailerPurchaseModel>(
  "RetailerPurchase",
  RetailerPurchaseSchema
);
