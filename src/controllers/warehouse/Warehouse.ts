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
  const { name, cityId, regionId, provinceId, longitude, latitude } = req.body;
  try {
    const warehouse = await Warehouse.create({
      name,
      cityId,
      regionId,
      provinceId,
      longitude,
      latitude,
    });
    res.status(201).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await Warehouse.findById(warehouseId);
    if (warehouse) {
      res.status(200).json({ data: warehouse });
    }
    throw new Error("Warehouse Not Found");
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readAllWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await Warehouse.find();
    res.status(200).json({ data: warehouses });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const updateWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, cityId, regionId, provinceId, longitude, latitude } =
      req.body;
    console.log("first");
    const updatedWarehouse = await Warehouse.updateOne(
      { _id },
      {
        name: name,
        cityId: cityId,
        regionId: regionId,
        provinceId: provinceId,
        longitude: longitude,
        latitude: latitude,
      }
    );
    if (!updatedWarehouse) throw new Error("Warehouse not found!");
    res.status(201).json({ data: updatedWarehouse });
  } catch (error) {
    res.status(500).json({ message: error });
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
    res.status(500).json({ message: error });
  }
};

export default {
  createWarehouse,
  readAllWarehouse,
  readWarehouse,
  updateWarehouse,
  deleteWarehouse,
};
