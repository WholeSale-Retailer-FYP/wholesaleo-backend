import mongoose, { Document, Schema } from "mongoose";
import { v1 as uuidv1 } from "uuid";

export interface IRetailerPOS {
  datetime: Date;
  orderNumber: string;
  retailerEmployeeId: mongoose.Types.ObjectId;
  totalAmount: number;
  // TODO: Is the schema correct? Do I need amount here?
  retailerId: mongoose.Types.ObjectId;
}

export interface IRetailerPOSModel extends IRetailerPOS, Document {}

const RetailerPOSSchema: Schema = new Schema({
  datetime: { type: Date, default: Date.now },
  orderNumber: { type: String, default: uuidv1() },
  totalAmount: { type: Number, required: true },
  retailerEmployeeId: {
    type: Schema.Types.ObjectId,
    ref: "RetailerEmployee",
    required: true,
  },
  retailerId: {
    type: Schema.Types.ObjectId,
    ref: "Retailer",
    required: true,
  },
});

export default mongoose.model<IRetailerPOSModel>(
  "RetailerPOS",
  RetailerPOSSchema
);
