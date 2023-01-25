import mongoose, { Document, Schema } from "mongoose";

enum Roles {
  Manager = 1,
  Employee,
}

export interface IWarehouseEmployee {
  name: string;
  cnic: number;
  phoneNumber: number;
  warehouseId: mongoose.Types.ObjectId;
  password: string;
  //   TODO: test if enum works
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
    phoneNumber: { type: Number, required: true },
    cnic: { type: Number, required: true },
    password: { type: String, required: true },
    role: { type: Roles, required: true },
  },
  {
    versionKey: false,
  }
);

export default mongoose.model<IWarehouseEmployeeModel>(
  "WarehouseEmployee",
  WarehouseEmployeeSchema
);
