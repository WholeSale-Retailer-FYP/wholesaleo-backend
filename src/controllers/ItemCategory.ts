import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ItemCategory from "../models/ItemCategory";

const createItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    const itemCategory = await ItemCategory.create({ name });
    res.status(201).json({ data: itemCategory });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemCategoryId = req.params.itemCategoryId;
    const itemCategory = await ItemCategory.findById(itemCategoryId);
    if (itemCategory) {
      res.status(200).json({ data: itemCategory });
    }
    throw new Error("ItemCategory Not Found");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readAllItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemCategorys = await ItemCategory.find();
    res.status(200).json({ data: itemCategorys });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name } = req.body;
    console.log("first");
    const updatedItemCategory = await ItemCategory.updateOne(
      { _id },
      { name: name }
    );
    if (!updatedItemCategory) throw new Error("ItemCategory not found!");
    res.status(201).json({ data: updatedItemCategory });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.itemCategoryId;
    const itemCategory = await ItemCategory.deleteOne({ _id });
    if (!itemCategory) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default {
  createItemCategory,
  readAllItemCategory,
  readItemCategory,
  updateItemCategory,
  deleteItemCategory,
};
