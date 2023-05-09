import mongoose, { Document, Schema } from "mongoose";

export interface IRetailerFavorites {
  retailerId: string;
  itemId: mongoose.Types.ObjectId;
}

export interface IRetailerFavoritesModel extends IRetailerFavorites, Document {}

const RetailerFavoritesSchema: Schema = new Schema({
  retailerId: { type: Schema.Types.ObjectId, ref: "Retailer", required: true },
  warehouseInventoryId: {
    type: Schema.Types.ObjectId,
    ref: "WarehouseInventory",
    required: true,
  },
});

export default mongoose.model<IRetailerFavoritesModel>(
  "RetailerFavorites",
  RetailerFavoritesSchema
);
