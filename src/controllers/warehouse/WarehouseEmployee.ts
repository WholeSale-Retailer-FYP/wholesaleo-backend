import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import WarehouseEmployee from "../../models/warehouse/WarehouseEmployee";
const bcrypt = require("bcrypt");

// TODO: user Login

const createWarehouseEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, cnic, phoneNumber, role, password, warehouseId } = req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const warehouse = await WarehouseEmployee.create({
      name,
      cnic,
      phoneNumber,
      role,
      password: hashedPassword,
      warehouseId,
    });
    res.status(201).json({ data: warehouse });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readWarehouseEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await WarehouseEmployee.findById(warehouseId);
    if (!warehouse) {
      throw new Error("WarehouseEmployee Not Found");
    }
    res.status(200).json({ data: warehouse });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllWarehouseEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await WarehouseEmployee.find();
    res.status(200).json({ data: warehouses });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateWarehouseEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, name, cnic, phoneNumber, role, password, warehouseId } =
      req.body;
    const updatedWarehouseEmployee = await WarehouseEmployee.updateOne(
      { _id },
      {
        name: name,
        cnic: cnic,
        phoneNumber: phoneNumber,
        role: role,
        password: password,
        warehouseId: warehouseId,
      }
    );
    if (!updatedWarehouseEmployee)
      throw new Error("WarehouseEmployee not found!");
    res.status(201).json({ data: updatedWarehouseEmployee });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const deleteWarehouseEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.warehouseId;
    const warehouse = await WarehouseEmployee.deleteOne({ _id });
    if (!warehouse) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createWarehouseEmployee,
  readAllWarehouseEmployee,
  readWarehouseEmployee,
  updateWarehouseEmployee,
  deleteWarehouseEmployee,
};
