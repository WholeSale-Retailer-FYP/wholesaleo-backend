import mongoose, { Document, Schema } from "mongoose";

export interface IRow {
  name: string;
  location: string;
  warehouseInventoryId: mongoose.Types.ObjectId;
  aisleId: mongoose.Types.ObjectId;
}

export interface IRowModel extends IRow, Document {}

const RowSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  warehouseInventoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "WarehouseInventory",
  },
  aisleID: { type: Schema.Types.ObjectId, required: true, ref: "Aisle" },
});

export default mongoose.model<IRowModel>("Row", RowSchema);
