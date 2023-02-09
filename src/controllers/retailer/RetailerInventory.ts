import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerInventory from "../../models/retailer/RetailerInventory";

const createRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    quantity,
    weight,
    originalPrice,
    sellingPrice,
    barcodeId,
    retailerId,
    itemId,
  } = req.body;
  try {
    const retailer = await RetailerInventory.create({
      quantity,
      weight,
      originalPrice,
      sellingPrice,
      barcodeId,
      retailerId,
      itemId,
    });
    res.status(201).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// read single entry of table
const readRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerInventoryId = req.params.retailerInventoryId;
    const retailer = await RetailerInventory.findById(
      retailerInventoryId
    ).populate([
      { path: "itemId", select: "name" },
      { path: "retailerId", select: "name" },
    ]);
    if (!retailer) {
      throw new Error("RetailerInventory Not Found");
    }
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// get inventory of specific retailer
// todo: add to postman
const readRetailerInventoryOfRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerId = req.params.retailerId;
    const retailer = await RetailerInventory.find({
      retailerId,
    }).populate([
      { path: "itemId", select: ["name", "image"] },
      { path: "retailerId", select: "shopName" },
    ]);

    if (!retailer) {
      throw new Error("RetailerInventory Not Found");
    }
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailers = await RetailerInventory.find().populate([
      { path: "itemId" },
      { path: "retailerId", select: "shopName" },
    ]);
    res.status(200).json({ data: retailers });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      quantity,
      weight,
      originalPrice,
      sellingPrice,
      barcodeId,
      retailerId,
      itemId,
    } = req.body;
    const updatedRetailerInventory = await RetailerInventory.updateOne(
      { _id },
      {
        quantity: quantity,
        weight: weight,
        originalPrice: originalPrice,
        sellingPrice: sellingPrice,
        barcodeId: barcodeId,
        retailerId: retailerId,
        itemId: itemId,
      }
    );
    if (!updatedRetailerInventory)
      throw new Error("RetailerInventory not found!");
    res.status(201).json({ data: updatedRetailerInventory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerId;
    const retailer = await RetailerInventory.deleteOne({ _id });
    if (!retailer) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerInventory,
  readAllRetailerInventory,
  readRetailerInventoryOfRetailer,
  readRetailerInventory,
  updateRetailerInventory,
  deleteRetailerInventory,
};
