import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import WarehouseInventory from "../../models/warehouse/WarehouseInventory";

const createWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    quantity,
    weight,
    originalPrice,
    sellingPrice,
    barcodeId,
    warehouseId,
    itemId,
  } = req.body;
  try {
    const warehouse = await WarehouseInventory.create({
      quantity,
      weight,
      originalPrice,
      sellingPrice,
      barcodeId,
      warehouseId,
      itemId,
    });
    res.status(201).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseInventoryId = req.params.warehouseInventoryId;
    const warehouse = await WarehouseInventory.findById(
      warehouseInventoryId
    ).populate([
      { path: "itemId", select: "name" },
      { path: "warehouseId", select: "name" },
    ]);
    if (warehouse) {
      res.status(200).json({ data: warehouse });
    }
    throw new Error("WarehouseInventory Not Found");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readWarehouseInventoryOfWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await WarehouseInventory.find({
      warehouseId,
    }).populate([
      { path: "itemId", select: "name" },
      { path: "warehouseId", select: "name" },
    ]);

    if (!warehouse) {
      throw new Error("WarehouseInventory Not Found");
    }
    res.status(200).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readAllWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await WarehouseInventory.find().populate([
      { path: "itemId", select: "name" },
      { path: "warehouseId", select: "name" },
    ]);
    res.status(200).json({ data: warehouses });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      quantity,
      weight,
      originalPrice,
      sellingPrice,
      barcodeId,
      warehouseId,
      itemId,
    } = req.body;
    const updatedWarehouseInventory = await WarehouseInventory.updateOne(
      { _id },
      {
        quantity: quantity,
        weight: weight,
        originalPrice: originalPrice,
        sellingPrice: sellingPrice,
        barcodeId: barcodeId,
        warehouseId: warehouseId,
        itemId: itemId,
      }
    );
    if (!updatedWarehouseInventory)
      throw new Error("WarehouseInventory not found!");
    res.status(201).json({ data: updatedWarehouseInventory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.warehouseId;
    const warehouse = await WarehouseInventory.deleteOne({ _id });
    if (!warehouse) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createWarehouseInventory,
  readAllWarehouseInventory,
  readWarehouseInventoryOfWarehouse,
  readWarehouseInventory,
  updateWarehouseInventory,
  deleteWarehouseInventory,
};
