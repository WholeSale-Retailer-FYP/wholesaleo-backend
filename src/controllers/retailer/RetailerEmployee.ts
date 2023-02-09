import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerEmployee from "../../models/retailer/RetailerEmployee";
const bcrypt = require("bcrypt");

const createRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { firstName, lastName, cnic, phoneNumber, role, password, retailerId } =
    req.body;

  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const retailerEmployee = await RetailerEmployee.create({
      firstName,
      lastName,
      cnic,
      phoneNumber,
      role,
      password: hashedPassword,
      retailerId,
    });
    res.status(201).json({ data: retailerEmployee });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerEmployeeId = req.params.retailerEmployeeId;
    const retailer = await RetailerEmployee.findById(
      retailerEmployeeId
    ).populate("retailerId", "shopName");

    if (!retailer) throw new Error("RetailerEmployee Not Found");

    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailer = await RetailerEmployee.find().populate(
      "retailerId",
      "shopName"
    );
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const loginRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { cnic, password } = req.body;
    const retailerEmployee = await RetailerEmployee.findOne({ cnic }).populate(
      "retailerId",
      "shopName"
    );

    if (!retailerEmployee)
      throw new Error("Retailer not found! Incorrect CNIC");

    if (await bcrypt.compare(password, retailerEmployee.password)) {
      const { _id } = retailerEmployee;
      res.json({
        data: {
          _id: retailerEmployee._id,
          firstName: retailerEmployee.firstName,
          lastName: retailerEmployee.lastName,
          phoneNumber: retailerEmployee.phoneNumber,
          role: retailerEmployee.role,
          retailerId: retailerEmployee.retailerId,
        },
      });
    } else throw new Error("Incorrect Password entered");
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      firstName,
      lastName,
      cnic,
      phoneNumber,
      role,
      password,
      retailerId,
    } = req.body;
    const updatedRetailerEmployee = await RetailerEmployee.updateOne(
      { _id },
      {
        firstName: firstName,
        lastName: lastName,
        cnic: cnic,
        phoneNumber: phoneNumber,
        role: role,
        password: password,
        retailerId: retailerId,
      }
    );
    if (!updatedRetailerEmployee)
      throw new Error("RetailerEmployee not found!");
    res.status(201).json({ data: updatedRetailerEmployee });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerEmployee = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerEmployeeId;
    const warehouse = await RetailerEmployee.deleteOne({ _id });
    if (!warehouse) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerEmployee,
  readAllRetailerEmployee,
  readRetailerEmployee,
  loginRetailerEmployee,
  updateRetailerEmployee,
  deleteRetailerEmployee,
};
