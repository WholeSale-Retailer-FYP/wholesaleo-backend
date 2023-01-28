import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/Item";
import { cloudinaryConfig } from "../config/cloudinaryConfig";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  const { name, itemCategoryId } = req.body;
  try {
    if (!req.file) res.status(500).json({ message: "No file present" });
    let uploadedFile: UploadApiResponse;

    uploadedFile = await cloudinary.uploader.upload(req.file!.path, {
      folder: "items",
      resource_type: "auto",
      width: 350,
      height: 350,
    });

    const item = await Item.create({
      name,
      itemCategoryId,
      image: uploadedFile.secure_url,
    });
    res.status(201).json({ data: item });
  } catch (error) {
    console.log(error);
  }
};

const readItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId).populate("itemCategoryId", "name");
    if (!item) {
      throw new Error("Item Not Found");
    }
    res.status(200).json({ data: item });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readItemOfCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemCategoryId = req.params.itemCategoryId;
    const item = await Item.find({ itemCategoryId }).populate(
      "itemCategoryId",
      "name"
    );
    if (!item) {
      throw new Error("Item Not Found");
    }
    res.status(200).json({ data: item });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readAllItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await Item.find().populate("itemCategoryId", "name");
    res.status(200).json({ data: items });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { _id, name, itemCategoryId } = req.body;
    const updatedItem = await Item.updateOne(
      { _id },
      { name: name, itemCategoryId: itemCategoryId }
    );
    if (!updatedItem) throw new Error("Item not found!");
    res.status(201).json({ data: updatedItem });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const _id = req.params.itemId;
    const item = await Item.deleteOne({ _id });
    if (!item) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default {
  createItem,
  readAllItem,
  readItemOfCategory,
  readItem,
  updateItem,
  deleteItem,
};
