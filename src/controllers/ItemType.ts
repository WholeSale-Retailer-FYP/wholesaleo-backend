import { NextFunction, Request, Response } from "express";
import ItemType from "../models/ItemType";

const createItemType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, quantity } = req.body;
  try {
    const itemType = await ItemType.create({ name, quantity });
    res.status(201).json({ data: itemType });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readItemType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemTypeId = req.params.itemTypeId;
    const itemType = await ItemType.findById(itemTypeId);
    if (!itemType) {
      throw new Error("ItemType Not Found");
    }
    res.status(200).json({ data: itemType });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllItemType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemTypes = await ItemType.find();
    res.status(200).json({ data: itemTypes });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateItemType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, quantity } = req.body;
    const updatedItemType = await ItemType.updateOne(
      { _id },
      { name, quantity }
    );
    if (!updatedItemType) throw new Error("ItemType not found!");
    res.status(201).json({ data: updatedItemType });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteItemType = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.itemTypeId;
    const itemType = await ItemType.deleteOne({ _id });
    if (!itemType) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createItemType,
  readAllItemType,
  readItemType,
  updateItemType,
  deleteItemType,
};
