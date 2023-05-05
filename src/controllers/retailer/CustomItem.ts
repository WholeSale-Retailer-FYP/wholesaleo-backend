import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import CustomItem, { ICustomItem } from "../../models/retailer/CustomItem";

const createCustomItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    image,
    weight,
    description,
    sellingPrice,
    originalPrice,
    quantity,
    retailerId,
    customCategoryId,
  } = req.body;
  try {
    const customItem = await CustomItem.create({
      name,
      image,
      weight,
      description,
      sellingPrice,
      originalPrice,
      quantity,
      retailerId,
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
    const customItems = await CustomItem.find().populate([
      {
        path: "customCategoryId",
        select: "name",
      },
      {
        path: "retailerId",
        select: "shopName",
      },
    ]);
    if (!customItems) throw new Error("Custom Category not found!");
    const copy = convertCustomItemToDefaultItem(customItems);

    res.status(200).json({ data: copy });
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
  const {
    _id,
    name,
    image,
    weight,
    description,
    sellingPrice,
    originalPrice,
    quantity,
    retailerId,
    customCategoryId,
  } = req.body;
  try {
    const customItem = await CustomItem.findByIdAndUpdate(_id, {
      name,
      image,
      weight,
      description,
      sellingPrice,
      originalPrice,
      quantity,
      retailerId,
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

export function convertCustomItemToDefaultItem(items: ICustomItem[]) {
  return items.map((item) => {
    const {
      _id,
      name,
      image,
      weight,
      sellingPrice,
      quantity,
      retailerId,
      originalPrice,
      description,
      customCategoryId,
    } = item;

    let warehouseInventoryId: any = {};
    const customCategoryName = customCategoryId as any;
    warehouseInventoryId._id = "x";
    warehouseInventoryId.weight = weight;
    warehouseInventoryId.itemId = {
      _id,
      name,
      image,
      description,
      categoryId: {
        _id: customCategoryId == null ? "x" : customCategoryName._id,
        name: customCategoryName == null ? "x" : customCategoryName.name,
      },
    };

    // if (customCategoryId == null) {
    //   console.log("here");
    //   warehouseInventoryId.itemId.categoryId._id = "x";
    //   warehouseInventoryId.itemId.categoryId.name = "X";
    // } else {
    //   warehouseInventoryId.itemId.categoryId._id = customCategoryId._id;
    //   warehouseInventoryId.itemId.categoryId.name = customCategoryName.name;
    // }

    return {
      _id,
      custom: true,
      retailerId,
      warehouseInventoryId,
      quantity,
      sellingPrice,
      originalPrice,
    };
  });
}

export default {
  createCustomItem,
  getAllCustomItem,
  getCustomItemOfRetailer,
  getCustomItemById,
  updateCustomItemById,
  deleteCustomItemById,
};
