import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomCategory from "../../models/retailer/CustomCategory";

const createCustomCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, retailerId } = req.body;
  try {
    const customCategory = await CustomCategory.create({
      name,
      retailerId,
    });
    if (!customCategory) throw new Error("Custom Category not created!");
    res.status(201).json({ data: customCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const getAllCustomCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const customCategories = await CustomCategory.find();
    if (!customCategories) throw new Error("Custom Category not found!");
    res.status(200).json({ data: customCategories });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const getCustomerCategoryOfRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { retailerId } = req.params;
  try {
    const customCategories = await CustomCategory.find({
      retailerId,
    });
    if (!customCategories) throw new Error("Custom Category not found!");
    res.status(200).json({ data: customCategories });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const getCustomCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customCategoryId } = req.params;
  try {
    const customCategory = await CustomCategory.findById(customCategoryId);
    if (!customCategory) throw new Error("Custom Category not found!");

    res.status(200).json({ data: customCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateCustomCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { _id, name, retailerId } = req.body;
  try {
    const customCategory = await CustomCategory.findByIdAndUpdate(_id, {
      name,
      retailerId,
    });
    if (!customCategory) throw new Error("Custom Category not found!");
    res.status(200).json({ data: customCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteCustomCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { customCategoryId } = req.params;
  try {
    const customCategory = await CustomCategory.findByIdAndDelete(
      customCategoryId
    );
    res.status(200).json({ data: "Custom Category Deleted!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createCustomCategory,
  getAllCustomCategories,
  getCustomerCategoryOfRetailer,
  getCustomCategoryById,
  updateCustomCategoryById,
  deleteCustomCategoryById,
};
