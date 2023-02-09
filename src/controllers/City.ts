import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import City from "../models/City";

const createCity = async (req: Request, res: Response, next: NextFunction) => {
  const { name, provinceId } = req.body;
  try {
    const city = await City.create({ name, provinceId });
    res.status(201).json({ data: city });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cityId = req.params.cityId;
    const city = await City.findById(cityId).populate("provinceId", "name");
    if (city) {
      res.status(200).json({ data: city });
    }
    throw new Error("City Not Found");
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const citys = await City.find().populate("provinceId", "name");
    res.status(200).json({ data: citys });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, name, provinceId } = req.body;
    const updatedCity = await City.updateOne(
      { _id },
      { name: name, provinceId: provinceId }
    );
    if (!updatedCity) throw new Error("City not found!");
    res.status(201).json({ data: updatedCity });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteCity = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.cityId;
    const city = await City.deleteOne({ _id });
    if (!city) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createCity,
  readAllCity,
  readCity,
  updateCity,
  deleteCity,
};
