import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Warehouse from "../../models/warehouse/Warehouse";
// Routes needed:
// Verify warehouse
const createWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, regionId, longitude, latitude } = req.body;
  try {
    const warehouse = await Warehouse.create({
      name,
      regionId,
      longitude,
      latitude,
    });
    res.status(201).json({ data: warehouse });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await Warehouse.findById(warehouseId).populate([
      "cityId",
      "regionId",
      "provinceId",
    ]);
    if (!warehouse) {
      throw new Error("Warehouse Not Found");
    }
    res.status(200).json({ data: warehouse });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await Warehouse.find().populate([
      "cityId",
      "regionId",
      "provinceId",
    ]);
    res.status(200).json({ data: warehouses });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const verifyWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const updatedWarehouse = await Warehouse.updateOne(
      { _id },
      {
        verified: true,
      }
    );
    if (!updatedWarehouse) throw new Error("Warehouse not found!");
    res.status(201).json({ data: updatedWarehouse });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, regionId, longitude, latitude } = req.body;
    const updatedWarehouse = await Warehouse.updateOne(
      { _id },
      {
        name: name,
        regionId: regionId,
        longitude: longitude,
        latitude: latitude,
      }
    );
    if (!updatedWarehouse) throw new Error("Warehouse not found!");
    res.status(201).json({ data: updatedWarehouse });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.warehouseId;
    const warehouse = await Warehouse.deleteOne({ _id });
    if (!warehouse) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createWarehouse,
  readAllWarehouse,
  readWarehouse,
  verifyWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
