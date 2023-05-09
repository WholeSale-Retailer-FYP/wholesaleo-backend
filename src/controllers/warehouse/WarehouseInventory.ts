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
    types,
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
      types,
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
    ).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);
    if (!warehouse) {
      throw new Error("WarehouseInventory Not Found");
    }
    res.status(200).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readInventoryOfWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await WarehouseInventory.find({
      warehouseId,
    }).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);

    if (!warehouse) {
      throw new Error("WarehouseInventory Not Found");
    }

    res.status(200).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readWarehouseItemOfCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const itemCategoryId = req.params.itemCategoryId;
    let warehouseInventory = await WarehouseInventory.find({
      warehouseId,
    }).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);

    if (!warehouseInventory) {
      throw new Error("WarehouseInventory Not Found");
    }
    console.log(warehouseInventory);
    warehouseInventory = warehouseInventory.filter((inventory) => {
      return inventory.itemId.itemCategoryId._id.equals(itemCategoryId);
    });

    res.status(200).json({ data: warehouseInventory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await WarehouseInventory.find().populate([
      { path: "itemId" },
      { path: "warehouseId", select: "name" },
    ]);
    res.status(200).json({ data: warehouses });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const searchItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, warehouseId } = req.params;
    var q = new RegExp(query, "i");
    let items = await WarehouseInventory.find({
      warehouseId,
    }).populate({
      path: "itemId",
      options: { retainNullValues: false },
      match: { $and: [{ name: q }] },
    });

    if (!items) throw new Error("Error Fetching Items!");

    items = items.filter((item) => {
      return item.itemId != null;
    });

    res.status(200).json({ data: items });
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
      types,
    } = req.body;
    const updatedWarehouseInventory = await WarehouseInventory.updateOne(
      { _id },
      {
        quantity,
        weight,
        originalPrice,
        sellingPrice,
        barcodeId,
        warehouseId,
        itemId,
        types,
      }
    );
    if (
      updatedWarehouseInventory.acknowledged &&
      updatedWarehouseInventory.modifiedCount == 0
    )
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
    console.log(warehouse);
    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createWarehouseInventory,
  readAllWarehouseInventory,
  readInventoryOfWarehouse,
  readWarehouseItemOfCategory,
  readWarehouseInventory,
  searchItem,
  updateWarehouseInventory,
  deleteWarehouseInventory,
};
