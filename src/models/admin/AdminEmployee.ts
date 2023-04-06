import mongoose, { Model, Schema } from "mongoose";

enum Roles {
  TOP_ADMIN = 0,
  PROVINCE_ADMIN,
  CITY_ADMIN,
}

export interface IAdminEmployee {
  name: string;
  email: string;
  password: string;
  role: Roles;
  cnic: string;
  provinceId: mongoose.Types.ObjectId;
  cityId: mongoose.Types.ObjectId;
  regionId: mongoose.Types.ObjectId;
}

const AdminEmployeeSchema: Schema<IAdminEmployee> = new Schema({
  // _id: { type: Schema.Types.ObjectId, auto: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: Number, enum: Roles, required: true },
  cnic: { type: String, required: true },
  provinceId: { type: Schema.Types.ObjectId, ref: "Province" },
  cityId: { type: Schema.Types.ObjectId, ref: "City" },
  regionId: { type: Schema.Types.ObjectId, ref: "Region" },
});

export default mongoose.model<IAdminEmployee>(
  "AdminEmployee",
  AdminEmployeeSchema
);
