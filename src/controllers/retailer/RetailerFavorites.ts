import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerFavorites from "../../models/retailer/RetailerFavorites";

const createRetailerFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { retailerId, warehouseInventoryId } = req.body;
  try {
    const retailerFavorites = await RetailerFavorites.create({
      retailerId,
      warehouseInventoryId,
    });
    res.status(201).json({ data: retailerFavorites });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerFavoritesId = req.params.retailerFavoritesId;
    const retailerFavorites = await RetailerFavorites.findById(
      retailerFavoritesId
    );
    if (!retailerFavorites) {
      throw new Error("RetailerFavorites Not Found");
    }
    res.status(200).json({ data: retailerFavorites });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerFavoritess = await RetailerFavorites.find();
    res.status(200).json({ data: retailerFavoritess });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, retailerId, warehouseInventoryId } = req.body;
    const updatedRetailerFavorites = await RetailerFavorites.updateOne(
      { _id },
      { retailerId, warehouseInventoryId }
    );
    if (!updatedRetailerFavorites)
      throw new Error("RetailerFavorites not found!");
    res.status(201).json({ data: updatedRetailerFavorites });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerFavorites = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerFavoritesId;
    const retailerFavorites = await RetailerFavorites.deleteOne({ _id });
    if (!retailerFavorites) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerFavorites,
  readAllRetailerFavorites,
  readRetailerFavorites,
  updateRetailerFavorites,
  deleteRetailerFavorites,
};
