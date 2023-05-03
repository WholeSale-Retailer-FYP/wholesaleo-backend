import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import ItemCategory, { IItemCategory } from "../models/ItemCategory";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import CustomCategory from "../models/retailer/CustomCategory";

const createItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name } = req.body;
  try {
    if (!req.file) res.status(500).json({ message: "No file present" });
    let uploadedFile: UploadApiResponse;

    uploadedFile = await cloudinary.uploader.upload(req.file!.path, {
      folder: "items",
      resource_type: "auto",
      width: 350,
      height: 350,
    });

    const itemCategory = await ItemCategory.create({
      name,
      image: uploadedFile.secure_url,
    });
    res.status(201).json({ data: itemCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};
const createItemCategoryFromUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, image } = req.body;
  try {
    const itemCategory = await ItemCategory.create({
      name,
      image,
    });
    res.status(201).json({ data: itemCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
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
    if (!itemCategory) {
      throw new Error("ItemCategory Not Found");
    }
    res.status(200).json({ data: itemCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
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
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readDefaultAndCustomCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { retailerId } = req.params;
    let itemCategorys = await ItemCategory.find();
    let customCategoryOfRetailer = await CustomCategory.find({
      retailerId,
    });

    itemCategorys.push(...customCategoryOfRetailer);

    res.status(200).json({ data: itemCategorys });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// todo: Handle image update. Delete previous image in Cloudinary andn then add new image to Cloudinary
const updateItemCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name } = req.body;
    const updatedItemCategory = await ItemCategory.updateOne(
      { _id },
      { name: name }
    );
    if (!updatedItemCategory) throw new Error("ItemCategory not found!");
    res.status(201).json({ data: updatedItemCategory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
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
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createItemCategory,
  readAllItemCategory,
  createItemCategoryFromUrl,
  readItemCategory,
  readDefaultAndCustomCategories,
  updateItemCategory,
  deleteItemCategory,
};
