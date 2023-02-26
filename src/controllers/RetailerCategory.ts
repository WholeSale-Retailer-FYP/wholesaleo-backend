import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerCategory from "../models/RetailerCategory";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

const createRetailerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const itemCategory = await RetailerCategory.create({
      name,
    });
    res.status(201).json({ data: itemCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemCategoryId = req.params.itemCategoryId;
    const itemCategory = await RetailerCategory.findById(itemCategoryId);
    if (!itemCategory) {
      throw new Error("RetailerCategory Not Found");
    }
    res.status(200).json({ data: itemCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemCategorys = await RetailerCategory.find();
    res.status(200).json({ data: itemCategorys });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// todo: Handle image update. Delete previous image in Cloudinary andn then add new image to Cloudinary
const updateRetailerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name } = req.body;
    const updatedRetailerCategory = await RetailerCategory.updateOne(
      { _id },
      { name: name }
    );
    if (!updatedRetailerCategory)
      throw new Error("RetailerCategory not found!");
    res.status(201).json({ data: updatedRetailerCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.itemCategoryId;
    const itemCategory = await RetailerCategory.deleteOne({ _id });
    if (!itemCategory) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerCategory,
  readAllRetailerCategory,
  readRetailerCategory,
  updateRetailerCategory,
  deleteRetailerCategory,
};
