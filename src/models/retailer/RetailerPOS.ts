import mongoose, { Document, Schema } from "mongoose";
import { v1 as uuidv1 } from "uuid";

export interface IRetailerPOS {
  datetime: Date;
  orderNumber: string;
  retailerEmployeeId: mongoose.Types.ObjectId;
  //   retailerId: mongoose.Types.ObjectId;
}

export interface IRetailerPOSModel extends IRetailerPOS, Document {}

const RetailerPOSSchema: Schema = new Schema({
  datetime: { type: Date, default: Date.now },
  orderNumber: { type: String, default: uuidv1() },
  retailerEmployeeId: {
    type: Schema.Types.ObjectId,
    ref: "RetailerEmployee",
    required: true,
  },
  //   retailerId: {
  //     type: Schema.Types.ObjectId,
  //     ref: "Retailer",
  //     required: true,
  //   },
});

export default mongoose.model<IRetailerPOSModel>(
  "RetailerPOS",
  RetailerPOSSchema
);
