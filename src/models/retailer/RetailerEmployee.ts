import mongoose, { Document, Schema } from "mongoose";

export enum Roles {
  Owner = 0,
  Manager,
  Employee,
}

export interface IRetailerEmployee {
  firstName: string;
  lastName: string;
  cnic: string;
  phoneNumber: string;
  password: string;
  role: Roles;
  image: string;
  retailerId: mongoose.Types.ObjectId;
}

export interface IRetailerEmployeeModel extends IRetailerEmployee, Document {}

const RetailerEmployeeSchema: Schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    cnic: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      enum: Roles,
      default: Roles.Employee,
      required: true,
    },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dca8sskac/image/upload/v1679653632/defaultProfile_ae3kr1.png",
    },
    retailerId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Retailer",
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IRetailerEmployeeModel>(
  "RetailerEmployee",
  RetailerEmployeeSchema
);
