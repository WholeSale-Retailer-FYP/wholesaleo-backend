import mongoose, { Document, Schema } from "mongoose";

export interface IWarehouseInventory {
  quantity: number;
  weight: number;
  originalPrice: number;
  sellingPrice: number;
  barcodeId: string;
  warehouseId: mongoose.Types.ObjectId;
  itemId: mongoose.Types.ObjectId | any;
  sectionId: mongoose.Types.ObjectId;
}

export interface IWarehouseInventoryModel
  extends IWarehouseInventory,
    Document {}

const WarehouseInventorySchema: Schema = new Schema({
  quantity: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  sellingPrice: { type: Number, required: true },
  weight: { type: Number, required: true },
  barcodeId: { type: String, required: true },
  warehouseId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Warehouse",
  },
  itemId: { type: Schema.Types.ObjectId, required: true, ref: "Item" },
});

export default mongoose.model<IWarehouseInventoryModel>(
  "WarehouseInventory",
  WarehouseInventorySchema
);
