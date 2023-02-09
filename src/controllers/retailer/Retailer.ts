import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Retailer from "../../models/retailer/Retailer";

const createRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    firstName,
    lastName,
    cnic,
    phoneNumber,
    shopName,
    postalCode,
    latitude,
    longitude,
    provinceId,
    cityId,
    regionId,
    warehouseId,
  } = req.body;
  try {
    const retailer = await Retailer.create({
      firstName,
      lastName,
      cnic,
      phoneNumber,
      shopName,
      postalCode,
      latitude,
      longitude,
      provinceId,
      cityId,
      regionId,
      warehouseId,
    });
    res.status(201).json({ data: retailer });
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
    const retailer = await Retailer.findById(retailerId).populate([
      "cityId",
      "regionId",
      "provinceId",
    ]);
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
    const retailers = await Retailer.find().populate([
      "cityId",
      "regionId",
      "provinceId",
    ]);
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
      firstName,
      lastName,
      cnic,
      phoneNumber,
      shopName,
      postalCode,
      latitude,
      longitude,
      provinceId,
      cityId,
      regionId,
      warehouseId,
    } = req.body;
    const updatedRetailer = await Retailer.updateOne(
      { _id },
      {
        firstName,
        lastName,
        cnic,
        phoneNumber,
        shopName,
        postalCode,
        latitude,
        longitude,
        provinceId,
        cityId,
        regionId,
        warehouseId,
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
  readAllRetailer,
  readRetailer,
  verifyRetailer,
  updateRetailer,
  deleteRetailer,
};
