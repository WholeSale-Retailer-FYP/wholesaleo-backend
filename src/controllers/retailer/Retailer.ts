import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Retailer from "../../models/retailer/Retailer";
import RetailerEmployee, {
  Roles,
} from "../../models/retailer/RetailerEmployee";
const bcrypt = require("bcrypt");


const createRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    shopName,
    postalCode,
    latitude,
    longitude,
    address,
    regionId,
    warehouseId,
    amountPayable,
    shopSize,
  } = req.body;
  try {
    const retailer = await Retailer.create({
      shopName,
      postalCode,
      latitude,
      longitude,
      address,
      regionId,
      warehouseId,
      amountPayable,
      shopSize,
    });
    res.status(201).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const createRetailerAndAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    shopName,
    postalCode,
    latitude,
    longitude,
    address,
    regionId,
    warehouseId,
    shopSize,

    firstName,
    lastName,
    cnic,
    password,
    phoneNumber,
  } = req.body;
  try {
    const retailer = await Retailer.create({
      shopName,
      postalCode,
      latitude,
      longitude,
      address,
      regionId,
      warehouseId,
      shopSize,
    });
    if (retailer) {
      const retailerId = retailer._id;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const retailerAdmin = await RetailerEmployee.create({
        firstName,
        lastName,
        cnic,
        phoneNumber,
        role: Roles.Owner,
        password: hashedPassword,
        retailerId,
      });
      if (!retailerAdmin) throw new Error("Retailer Admin not created!");
      res.status(201).json({ data: retailer });
    }
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerId = req.params.retailerId;
    const retailer = await Retailer.findById(retailerId).populate(["regionId"]);
    if (!retailer) {
      throw new Error("Retailer Not Found");
    }
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailers = await Retailer.find().populate(["regionId"]);
    res.status(200).json({ data: retailers });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const verifyRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const updatedRetailer = await Retailer.updateOne(
      { _id },
      {
        verified: true,
      }
    );
    if (!updatedRetailer) throw new Error("Retailer not found!");
    res.status(201).json({ data: updatedRetailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      shopName,
      postalCode,
      latitude,
      address,
      longitude,
      regionId,
      warehouseId,
      amountPayable,
      shopSize,
    } = req.body;
    const updatedRetailer = await Retailer.updateOne(
      { _id },
      {
        shopName,
        postalCode,
        latitude,
        address,
        longitude,
        regionId,
        warehouseId,
        amountPayable,
        shopSize,
      }
    );
    if (!updatedRetailer) throw new Error("Retailer not found!");
    res.status(201).json({ data: updatedRetailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerId;
    const retailer = await Retailer.deleteOne({ _id });
    if (!retailer) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailer,
  createRetailerAndAdmin,
  readAllRetailer,
  readRetailer,
  verifyRetailer,
  updateRetailer,
  deleteRetailer,
};
