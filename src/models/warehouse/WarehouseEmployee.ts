import mongoose, { Document, Schema } from "mongoose";

enum Roles {
  Manager = 1,
  Employee,
}

export interface IWarehouseEmployee {
  name: string;
  cnic: number;
  phoneNumber: string;
  warehouseId: mongoose.Types.ObjectId;
  password: string;
  role: Roles;
}

export interface IWarehouseEmployeeModel extends IWarehouseEmployee, Document {}

const WarehouseEmployeeSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    warehouseId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Warehouse",
    },
    phoneNumber: { type: String, required: true, unique: true },
    cnic: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: Number,
      enum: Roles,
      default: Roles.Employee,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IWarehouseEmployeeModel>(
  "WarehouseEmployee",
  WarehouseEmployeeSchema
);
