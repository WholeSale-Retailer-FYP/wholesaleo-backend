import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerPOS from "../../models/retailer/RetailerPOS";

const createRetailerPOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { retailerEmployeeId } = req.body;
  try {
    const retailerPOS = await RetailerPOS.create({ retailerEmployeeId });
    res.status(201).json({ data: retailerPOS });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerPOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPOSId = req.params.retailerPOSId;
    const retailerPOS = await RetailerPOS.findById(retailerPOSId).populate({
      path: "retailerEmployeeId",
      select: ["firstName", "lastName", "role"],
    });
    if (!retailerPOS) {
      throw new Error("RetailerPOS Not Found");
    }
    res.status(200).json({ data: retailerPOS });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerPOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerPOSs = await RetailerPOS.find().populate({
      path: "retailerEmployeeId",
      select: ["firstName", "lastName", "role"],
    });
    res.status(200).json({ data: retailerPOSs });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerPOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, retailerEmployeeId } = req.body;
    const updatedRetailerPOS = await RetailerPOS.updateOne(
      { _id },
      { retailerEmployeeId: retailerEmployeeId }
    );
    if (!updatedRetailerPOS) throw new Error("RetailerPOS not found!");
    res.status(201).json({ data: updatedRetailerPOS });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerPOS = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerPOSId;
    const retailerPOS = await RetailerPOS.deleteOne({ _id });
    if (!retailerPOS) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerPOS,
  readAllRetailerPOS,
  readRetailerPOS,
  updateRetailerPOS,
  deleteRetailerPOS,
};
