import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Retailer from "../../models/retailer/Retailer";
import RetailerEmployee, {
  Roles,
} from "../../models/retailer/RetailerEmployee";
import RetailerPurchase from "../../models/retailer/RetailerPurchase";
import RetailerSaleData from "../../models/retailer/RetailerSaleData";

const bcrypt = require("bcrypt");

const createRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    shopName,
    postalCode,
    latitude,
    longitude,
    address,
    regionId,
    warehouseId,
    amountPayable,
    shopSize,
  } = req.body;
  try {
    const retailer = await Retailer.create({
      shopName,
      postalCode,
      latitude,
      longitude,
      address,
      regionId,
      warehouseId,
      amountPayable,
      shopSize,
    });
    res.status(201).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const createRetailerAndAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    shopName,
    postalCode,
    latitude,
    longitude,
    address,
    regionId,
    warehouseId,
    shopSize,

    firstName,
    lastName,
    cnic,
    password,
    phoneNumber,
  } = req.body;
  const session = await Retailer.startSession();
  try {
    session.startTransaction();
    const retailerId = new mongoose.Types.ObjectId();
    const retailer = await Retailer.create(
      [
        {
          _id: retailerId,
          shopName,
          postalCode,
          latitude,
          longitude,
          address,
          regionId,
          warehouseId,
          shopSize,
        },
      ],
      { session }
    );
    if (retailer) {
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const retailerAdmin = await RetailerEmployee.create(
        [
          {
            firstName,
            lastName,
            cnic,
            phoneNumber,
            role: Roles.Owner,
            password: hashedPassword,
            retailerId,
          },
        ],
        { session }
      );
      if (!retailerAdmin) {
        throw new Error("Retailer Admin not created!");
      }
      await session.commitTransaction();
      res.status(201).json({ data: retailer });
      session.endSession();
    }
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerId = req.params.retailerId;
    const retailer = await Retailer.findById(retailerId).populate(["regionId"]);
    if (!retailer) {
      throw new Error("Retailer Not Found");
    }
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailers = await Retailer.find().populate(["regionId"]);
    res.status(200).json({ data: retailers });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// read unverified retailers
const readUnverifiedRetailers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailers = await Retailer.find({ verified: false }).populate([
      "regionId",
    ]);
    res.status(200).json({ data: retailers });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const verifyRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.body;
    const updatedRetailer = await Retailer.updateOne(
      { _id },
      {
        verified: true,
      }
    );
    if (!updatedRetailer) throw new Error("Retailer not found!");
    res.status(201).json({ data: updatedRetailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      _id,
      shopName,
      postalCode,
      latitude,
      address,
      longitude,
      regionId,
      warehouseId,
      amountPayable,
      shopSize,
    } = req.body;
    const updatedRetailer = await Retailer.updateOne(
      { _id },
      {
        shopName,
        postalCode,
        latitude,
        address,
        longitude,
        regionId,
        warehouseId,
        amountPayable,
        shopSize,
      }
    );
    if (!updatedRetailer) throw new Error("Retailer not found!");
    res.status(201).json({ data: updatedRetailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerId;
    const retailer = await Retailer.deleteOne({ _id });
    if (!retailer) throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

interface DashboardAnalytics {
  accountPayable: number;
  totalOrders: number;
  totalSalesCount: number;
  totalSalesAmount: number;
  totalEmployees: number;
}

const dashboardAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerId = req.params.retailerId;
    let analytics: DashboardAnalytics = {
      accountPayable: 0,
      totalOrders: 0,
      totalSalesCount: 0,
      totalSalesAmount: 0,
      totalEmployees: 0,
    };
    const retailer = await Retailer.findById(retailerId);
    if (!retailer) throw new Error("Retailer Not Found");

    analytics.accountPayable = retailer.amountPayable;

    // get sales of retailer
    const retailerSales = await RetailerSaleData.find({ retailerId }).populate(
      "retailerInventoryId"
    );

    if (retailerSales) {
      analytics.totalSalesCount = retailerSales.length;

      // TODO: get retailer sales amount
      // const copy = retailerSales as any;
      // analytics.totalSalesAmount = copy.reduce(
      //   (acc: any, curr: any) => acc + curr.retailerInventoryId.sellingPrice,
      //   0
      // );
    }

    // get employees of retailer
    const employees = await RetailerEmployee.find({ retailerId });
    if (RetailerEmployee) analytics.totalEmployees = employees.length;

    // get orders of retailer
    const retailerPurchase = await RetailerPurchase.find({ retailerId });
    if (retailerPurchase) analytics.totalOrders = retailerPurchase.length;

    res.status(200).json({ data: analytics });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailer,
  createRetailerAndAdmin,
  readAllRetailer,
  readRetailer,
  readUnverifiedRetailers,
  verifyRetailer,
  updateRetailer,
  deleteRetailer,
  dashboardAnalytics,
};
