import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import Retailer from "../../models/retailer/Retailer";
import RetailerPurchase from "../../models/retailer/RetailerPurchase";
import RetailerPurchaseData from "../../models/retailer/RetailerPurchaseData";
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
    const warehouse = await Warehouse.findById(warehouseId).populate({
      path: "regionId",
      populate: {
        path: "cityId",
        populate: {
          path: "provinceId",
        },
      },
    });
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
    const warehouses = await Warehouse.find().populate({
      path: "regionId",
      populate: {
        path: "cityId",
        populate: {
          path: "provinceId",
        },
      },
    });
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

const dashboardAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { warehouseId } = req.params;
    let details = {
      totalRetailers: 0,
      salesToday: 0,
      monthlySales: 0,
      yearlySales: 0,
      monthlyData: [
        {
          month: "January",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "February",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "March",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "April",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "May",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "June",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "July",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "August",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "September",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "October",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "November",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
        {
          month: "December",
          totalSales: 0,
          totalUnits: 8156,
          _id: "637000f7a5a686695b5170b3",
        },
      ],
    };

    const totalRetailers = await Retailer.find({
      warehouseId,
    }).countDocuments();
    if (totalRetailers) details.totalRetailers = totalRetailers;

    const salesToday = await RetailerPurchase.find({
      warehouseId,
      datetime: { $gte: new Date().setHours(0, 0, 0, 0) },
    }).countDocuments();
    if (salesToday) details.salesToday = salesToday;

    const monthlySales = await RetailerPurchase.find({
      warehouseId,
      datetime: { $gte: new Date().setDate(1) },
    }).countDocuments();
    if (monthlySales) details.monthlySales = monthlySales;

    const yearlySales = await RetailerPurchase.find({
      warehouseId,
      datetime: { $gte: new Date().setMonth(0) },
    }).countDocuments();
    if (yearlySales) details.yearlySales = yearlySales;

    // get total sales for each month
    const monthlySalesData = await RetailerPurchase.aggregate([
      {
        $group: {
          _id: { $month: "$datetime" }, // Assuming the date field is named "datetime"
          totalSales: { $sum: "$totalPrice" }, // Assuming the sales amount field is named "totalPrice"
        },
      },
      {
        $project: {
          _id: 0,
          month: {
            $switch: {
              branches: [
                { case: { $eq: ["$_id", 1] }, then: "January" },
                { case: { $eq: ["$_id", 2] }, then: "February" },
                { case: { $eq: ["$_id", 3] }, then: "March" },
                { case: { $eq: ["$_id", 4] }, then: "April" },
                { case: { $eq: ["$_id", 5] }, then: "May" },
                { case: { $eq: ["$_id", 6] }, then: "June" },
                { case: { $eq: ["$_id", 7] }, then: "July" },
                { case: { $eq: ["$_id", 8] }, then: "August" },
                { case: { $eq: ["$_id", 9] }, then: "September" },
                { case: { $eq: ["$_id", 10] }, then: "October" },
                { case: { $eq: ["$_id", 11] }, then: "November" },
                { case: { $eq: ["$_id", 12] }, then: "December" },
              ],
              default: "Unknown",
            },
          },
          totalSales: 1,
        },
      },
    ]);
    monthlySalesData.forEach((data) => {
      const index = details.monthlyData.findIndex(
        (month) => month.month === data.month
      );
      details.monthlyData[index].totalSales = data.totalSales;
    });

    res.status(200).json({ data: details });
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
  dashboardAnalytics,
};
