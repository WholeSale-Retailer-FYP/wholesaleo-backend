import mongoose, { Document, Schema } from "mongoose";

export interface IShelf {
  name: string;
  location: string;
  capacity: number;
  presentQuantity: number;
  aisleId: mongoose.Types.ObjectId;
}

export interface IShelfModel extends IShelf, Document {}

const ShelfSchema: Schema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  capacity: { type: Number, required: true },
  presentQuantity: { type: Number, required: false, default: 0 },
  aisleID: { type: Schema.Types.ObjectId, required: true, ref: "Aisle" },
});

export default mongoose.model<IShelfModel>("Shelf", ShelfSchema);
