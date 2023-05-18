import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerPurchaseData from "../../models/retailer/RetailerPurchaseData";

const createRetailerPurchaseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { warehouseInventoryId, quantity, retailerPurchaseId } = req.body;
  try {
    const retailerPurchaseData = await RetailerPurchaseData.create({
      warehouseInventoryId,
      quantity,
      retailerPurchaseId,
    });
    res.status(201).json({ data: retailerPurchaseData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerPurchaseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPurchaseDataId = req.params.retailerPurchaseDataId;
    const retailerPurchaseData = await RetailerPurchaseData.findById(
      retailerPurchaseDataId
    ).populate([
      {
        path: "retailerPurchaseId",
        populate: {
          path: "retailerId",
          select: ["firstName", "lastName", "role"],
        },
      },
      {
        path: "warehouseInventoryId",
        select: ["barcodeId", "sellingPrice"],
        populate: {
          path: "itemId",
          select: ["name", "image", "cartonSize"],
        },
      },
    ]);
    if (!retailerPurchaseData) {
      throw new Error("RetailerPurchaseData Not Found");
    }
    res.status(200).json({ data: retailerPurchaseData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerPurchaseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPurchaseDatas = await RetailerPurchaseData.find().populate([
      {
        path: "retailerPurchaseId",
        populate: {
          path: "retailerId",
          select: ["firstName", "lastName", "role"],
        },
      },
      {
        path: "warehouseInventoryId",
        select: ["barcodeId", "sellingPrice"],
        populate: {
          path: "itemId",
          select: ["name", "image", "cartonSize"],
        },
      },
    ]);
    res.status(200).json({ data: retailerPurchaseDatas });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readDataOfPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPurchaseId = req.params.retailerPurchaseId;
    const retailerPurchaseData = await RetailerPurchaseData.find({
      retailerPurchaseId,
    }).populate([
      {
        path: "retailerPurchaseId",
        populate: {
          path: "retailerId",
          select: ["firstName", "lastName", "role"],
        },
      },
      {
        path: "warehouseInventoryId",
        select: ["barcodeId", "sellingPrice"],
        populate: {
          path: "itemId",
          select: ["name", "image", "cartonSize"],
        },
      },
    ]);
    if (!retailerPurchaseData) {
      throw new Error("RetailerPurchaseData Not Found");
    }
    res.status(200).json({ data: retailerPurchaseData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerPurchaseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, warehouseInventoryId, quantity, retailerPurchaseId } =
      req.body;
    const updatedRetailerPurchaseData = await RetailerPurchaseData.updateOne(
      { _id },
      { warehouseInventoryId, quantity, retailerPurchaseId }
    );
    if (!updatedRetailerPurchaseData)
      throw new Error("RetailerPurchaseData not found!");
    res.status(201).json({ data: updatedRetailerPurchaseData });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerPurchaseData = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerPurchaseDataId;
    const retailerPurchaseData = await RetailerPurchaseData.deleteOne({ _id });
    if (!retailerPurchaseData) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerPurchaseData,
  readAllRetailerPurchaseData,
  readRetailerPurchaseData,
  readDataOfPurchase,
  updateRetailerPurchaseData,
  deleteRetailerPurchaseData,
};
