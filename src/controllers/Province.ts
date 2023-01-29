import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Province from "../models/Province";

const createProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const province = await Province.create({ name });
    res.status(201).json({ data: province });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provinceId = req.params.provinceId;
    const province = await Province.findById(provinceId);
    if (!province) {
      throw new Error("Province Not Found");
    }
    res.status(200).json({ data: province });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const provinces = await Province.find();
    res.status(200).json({ data: provinces });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name } = req.body;
    const updatedProvince = await Province.updateOne({ _id }, { name: name });
    if (!updatedProvince) throw new Error("Province not found!");
    res.status(201).json({ data: updatedProvince });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteProvince = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.provinceId;
    const province = await Province.deleteOne({ _id });
    if (!province) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createProvince,
  readAllProvince,
  readProvince,
  updateProvince,
  deleteProvince,
};
