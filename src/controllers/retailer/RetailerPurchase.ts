import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerPurchase from "../../models/retailer/RetailerPurchase";
import Retailer from "../../models/retailer/Retailer";
import RetailerPurchaseData from "../../models/retailer/RetailerPurchaseData";
import WarehouseInventory from "../../models/warehouse/WarehouseInventory";
import { OrderStatus } from "../../models/retailer/RetailerPurchase";
import RetailerInventory from "../../models/retailer/RetailerInventory";

// When Retailer buys goods from mobile app

interface IItem {
  warehouseInventoryId: mongoose.Types.ObjectId;
  quantity: number;
  retailerPurchaseId: mongoose.Types.ObjectId;
}

// reduce quantity from warehouse inventory (warehouseInventoryId)
// add quantity to retailer inventory (retailerInventoryId)
// TODO: Finish createRetailerPurchase function
const createRetailerPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { retailerId, warehouseId, items, totalAmount } = req.body;
  const session = await RetailerPurchase.startSession();
  try {
    session.startTransaction();

    const retailerPurchaseId = new mongoose.Types.ObjectId();

    // add retailer purchase -XXX
    const retailerPurchase = await RetailerPurchase.create({
      _id: retailerPurchaseId,
      retailerId,
      warehouseId,
      totalAmount,
    });

    // set amount payable -XXX
    const retailerPayable = await Retailer.findOneAndUpdate(
      { _id: retailerId },
      { $inc: { amountPayable: 5 } }
    );

    // add retailer purchase data
    items.forEach((item: IItem) => {
      item.retailerPurchaseId = retailerPurchaseId;
    });
    await RetailerPurchaseData.insertMany(items);

    // add quantity to retailer inventory (retailerInventoryId)
    // https://stackoverflow.com/questions/17207183/way-to-update-multiple-documents-with-different-values
    await RetailerInventory.bulkWrite(
      items.map((item: IItem) => ({
        updateOne: {
          filter: { _id: item.warehouseInventoryId },
          update: { $inc: { quantity: item.quantity } },
        },
      }))
    );

    // reduce quantity from warehouse inventory (warehouseInventoryId)
    await WarehouseInventory.bulkWrite(
      items.map((item: IItem) => ({
        updateOne: {
          filter: { _id: item.warehouseInventoryId },
          update: { $dec: { quantity: item.quantity } },
        },
      }))
    );
    await session.commitTransaction();
    res.status(201).json({ data: true });
    session.endSession();
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPurchaseId = req.params.retailerPurchaseId;
    const retailerPurchase = await RetailerPurchase.findById(
      retailerPurchaseId
    ).populate({
      path: "retailerId",
      select: ["firstName", "lastName", "shopName"],
    });
    if (!retailerPurchase) {
      throw new Error("RetailerPurchase Not Found");
    }
    res.status(200).json({ data: retailerPurchase });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPurchases = await RetailerPurchase.find().populate({
      path: "retailerId",
      select: ["firstName", "lastName", "shopName"],
    });
    res.status(200).json({ data: retailerPurchases });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, retailerEmployeeId } = req.body;
    const updatedRetailerPurchase = await RetailerPurchase.updateOne(
      { _id },
      { retailerEmployeeId: retailerEmployeeId }
    );
    if (!updatedRetailerPurchase)
      throw new Error("RetailerPurchase not found!");
    res.status(201).json({ data: updatedRetailerPurchase });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerPurchase = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerPurchaseId;
    const retailerPurchase = await RetailerPurchase.deleteOne({ _id });
    if (!retailerPurchase) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerPurchase,
  readAllRetailerPurchase,
  readRetailerPurchase,
  updateRetailerPurchase,
  deleteRetailerPurchase,
};
