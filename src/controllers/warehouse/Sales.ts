import { NextFunction, Request, Response } from "express";
import RetailerPurchase from "../../models/retailer/RetailerPurchase";
import RetailerPurchaseData from "../../models/retailer/RetailerPurchaseData";

const readWarehouseSales = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const sales = await RetailerPurchase.find({ warehouseId });
    if (!sales) {
      throw new Error("RetailerPurchase Not Found");
    }
    res.status(200).json({ data: sales });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id, orderStatus } = req.body;
    const update = await RetailerPurchase.updateOne(
      { _id: _id },
      { $set: { orderStatus } }
    );
    if (!update) {
      throw new Error("RetailerPurchase Not Found");
    }
    res.status(200).json({ data: update });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};
// TODO: Add Date Range
const finances = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const warehouseId = req.params.warehouseId;
    const sales = await RetailerPurchase.find({ warehouseId });
    if (!sales) {
      throw new Error("RetailerPurchase Not Found");
    }

    const salesIds = sales.map((sale) => sale._id);

    // find all retailerpurchasedata with matching -id from sales
    const salesData = await RetailerPurchaseData.find({
      retailerPurchaseId: { $in: salesIds },
    }).populate("warehouseInventoryId");

    // use reducer to calculate total sellingPrice
    const totalSellingPrice = salesData.reduce(
      (acc, curr: any) => acc + curr.warehouseInventoryId.sellingPrice,
      0
    );
    const totalPurchasePrice = salesData.reduce(
      (acc, curr: any) => acc + curr.warehouseInventoryId.originalPrice,
      0
    );

    const numItemsSold = salesData.reduce(
      (acc, curr: any) => acc + curr.warehouseInventoryId.quantity,
      0
    );

    const revenue = totalSellingPrice - totalPurchasePrice;

    res.status(200).json({
      data: {
        numOrders: salesData.length,
        numItemsSold,
        totalSellingPrice,
        totalPurchasePrice,
        revenue,
        salesData,
      },
    });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  readWarehouseSales,
  updateOrderStatus,
  finances,
};
