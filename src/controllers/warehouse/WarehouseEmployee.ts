import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import WarehouseEmployee from "../../models/warehouse/WarehouseEmployee";
import jwt, { Secret } from "jsonwebtoken";
const bcrypt = require("bcrypt");

const createWarehouseEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { name, cnic, email, phoneNumber, role, password, warehouseId } =
    req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const warehouse = await WarehouseEmployee.create({
      name,
      cnic,
      email,
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

const readEmployeesOfWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouses = await WarehouseEmployee.find({ warehouseId });
    if (!warehouses) throw new Error("Warehouse Not Found");

    res.status(200).json({ data: warehouses });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const loginEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;
  console.log(req.body);
  try {
    // check if email is in the database
    const warehouseEmployee = (await WarehouseEmployee.findOne({
      email,
    })) as any;
    if (!warehouseEmployee) {
      throw new Error("Email not found!");
    }
    if (await bcrypt.compare(password, warehouseEmployee.password)) {
      const data = {
        _id: warehouseEmployee._id,
        name: warehouseEmployee.name,
        phoneNumber: warehouseEmployee.phoneNumber,
        cnic: warehouseEmployee.cnic,
        email: warehouseEmployee.email,
        role: warehouseEmployee.role,
        warehouseId: warehouseEmployee.warehouseId,
      };

      // const token = jwt.sign({ data }, process.env.SECRET_KEY as Secret, {
      //   expiresIn: "20s",
      // });
      const token = jwt.sign({ data }, process.env.SECRET_KEY as Secret);

      res.status(200).json({
        data,
        token,
      });
    } else throw new Error("Password is incorrect!");
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
    const _id = req.params.warehouseEmployeeId;
    const warehouse = await WarehouseEmployee.deleteOne({ _id });
    if (warehouse.acknowledged && warehouse.deletedCount == 0)
      throw new Error("Could not delete!");
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
  readEmployeesOfWarehouse,
  loginEmployee,
  updateWarehouseEmployee,
  deleteWarehouseEmployee,
};
