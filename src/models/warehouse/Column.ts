import mongoose, { Document, Schema } from "mongoose";
// TODO: See how to manage asile, row, column, shelf
export interface IColumn {
  name: string;
  location: string;
  warehouseInventoryId: mongoose.Types.ObjectId;
  aisleId: mongoose.Types.ObjectId;
}

export interface IColumnModel extends IColumn, Document {}

const ColumnSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  warehouseInventoryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "WarehouseInventory",
  },
  aisleID: { type: Schema.Types.ObjectId, required: true, ref: "Aisle" },
});

export default mongoose.model<IColumnModel>("Column", ColumnSchema);
