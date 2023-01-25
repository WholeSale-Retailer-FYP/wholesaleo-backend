import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Region from "../models/Region";

const createRegion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, cityId } = req.body;
  try {
    const region = await Region.create({ name, cityId });
    res.status(201).json({ data: region });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readRegion = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const regionId = req.params.regionId;
    const region = await Region.findById(regionId).populate({
      path: "cityId",
      populate: {
        path: "provinceId",
      },
    });
    if (region) {
      res.status(200).json({ data: region });
    }
    throw new Error("Region Not Found");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readAllRegion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const regions = await Region.find().populate({
      path: "cityId",
      populate: {
        path: "provinceId",
      },
    });
    res.status(200).json({ data: regions });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateRegion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, cityId } = req.body;
    console.log("first");
    const updatedRegion = await Region.updateOne(
      { _id },
      { name: name, cityId: cityId }
    );
    if (!updatedRegion) throw new Error("Region not found!");
    res.status(201).json({ data: updatedRegion });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteRegion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.regionId;
    const region = await Region.deleteOne({ _id });
    if (!region) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default {
  createRegion,
  readAllRegion,
  readRegion,
  updateRegion,
  deleteRegion,
};
