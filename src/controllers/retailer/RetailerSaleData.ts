import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerSaleData from "../../models/retailer/RetailerSaleData";

const createRetailerSaleData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { retailerInventoryId, quantity, retailerPOSId } = req.body;
  try {
    const retailerSaleData = await RetailerSaleData.create({
      retailerInventoryId,
      quantity,
      retailerPOSId,
    });
    res.status(201).json({ data: retailerSaleData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerSaleData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerSaleDataId = req.params.retailerSaleDataId;
    const retailerSaleData = await RetailerSaleData.findById(
      retailerSaleDataId
    ).populate([
      {
        path: "retailerPOSId",
        populate: {
          path: "retailerEmployeeId",
          select: ["firstName", "lastName", "role"],
        },
      },
      {
        path: "retailerInventoryId",
        select: ["barcodeId", "sellingPrice"],
        populate: {
          path: "itemId",
          select: ["name", "image"],
        },
      },
    ]);
    if (!retailerSaleData) {
      throw new Error("RetailerSaleData Not Found");
    }
    res.status(200).json({ data: retailerSaleData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerSaleData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerSaleDatas = await RetailerSaleData.find().populate([
      {
        path: "retailerPOSId",
        populate: {
          path: "retailerEmployeeId",
          select: ["firstName", "lastName", "role"],
        },
      },
      {
        path: "retailerInventoryId",
        select: ["barcodeId", "sellingPrice"],
        populate: {
          path: "itemId",
          select: ["name", "image"],
        },
      },
    ]);
    res.status(200).json({ data: retailerSaleDatas });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerSaleData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, retailerInventoryId, quantity, retailerPOSId } = req.body;
    const updatedRetailerSaleData = await RetailerSaleData.updateOne(
      { _id },
      { retailerInventoryId, quantity, retailerPOSId }
    );
    if (!updatedRetailerSaleData)
      throw new Error("RetailerSaleData not found!");
    res.status(201).json({ data: updatedRetailerSaleData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerSaleData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerSaleDataId;
    const retailerSaleData = await RetailerSaleData.deleteOne({ _id });
    if (!retailerSaleData) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerSaleData,
  readAllRetailerSaleData,
  readRetailerSaleData,
  updateRetailerSaleData,
  deleteRetailerSaleData,
};
