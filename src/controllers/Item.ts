import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Item from "../models/Item";

const createItem = async (req: Request, res: Response, next: NextFunction) => {
  const { name, itemCategoryId } = req.body;
  try {
    const item = await Item.create({ name, itemCategoryId });
    res.status(201).json({ data: item });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const itemId = req.params.itemId;
    const item = await Item.findById(itemId).populate("itemCategoryId", "name");
    if (item) {
      res.status(200).json({ data: item });
    }
    throw new Error("Item Not Found");
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
    console.log("first");
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
  readItem,
  updateItem,
  deleteItem,
};