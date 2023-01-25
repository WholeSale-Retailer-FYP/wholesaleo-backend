import mongoose, { Document, Schema } from "mongoose";

export interface IAisle {
  name: string;
  warehouseId: mongoose.Types.ObjectId;
}

export interface IAisleModel extends IAisle, Document {}

const AisleSchema: Schema = new Schema({
  name: { type: String, required: true },
  warehouseID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Warehouse",
  },
});

export default mongoose.model<IAisleModel>("Aisle", AisleSchema);
