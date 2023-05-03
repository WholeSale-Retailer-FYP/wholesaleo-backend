import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomItem from "../../models/retailer/CustomItem";

const createCustomItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, retailerId, image, customCategoryId } = req.body;
  try {
    const customItem = await CustomItem.create({
      name,
      retailerId,
      image,
      customCategoryId,
    });
    if (!customItem) throw new Error("Custom Category not created!");
    res.status(201).json({ data: customItem });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const getAllCustomItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customCategories = await CustomItem.find();
    if (!customCategories) throw new Error("Custom Category not found!");
    res.status(200).json({ data: customCategories });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const getCustomItemOfRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { retailerId } = req.params;
  try {
    const customCategories = await CustomItem.find({
      retailerId,
    });
    if (!customCategories) throw new Error("Custom Category not found!");
    res.status(200).json({ data: customCategories });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const getCustomItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customItemId } = req.params;
  try {
    const customItem = await CustomItem.findById(customItemId);
    if (!customItem) throw new Error("Custom Category not found!");

    res.status(200).json({ data: customItem });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateCustomItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, name, retailerId, image, customCategoryId } = req.body;
  try {
    const customItem = await CustomItem.findByIdAndUpdate(_id, {
      name,
      retailerId,
      image,
      customCategoryId,
    });
    if (!customItem) throw new Error("Custom Category not found!");
    res.status(200).json({ data: customItem });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteCustomItemById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customItemId } = req.params;
  try {
    const customItem = await CustomItem.findByIdAndDelete(customItemId);
    res.status(200).json({ data: "Custom Category Deleted!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createCustomItem,
  getAllCustomItem,
  getCustomItemOfRetailer,
  getCustomItemById,
  updateCustomItemById,
  deleteCustomItemById,
};
