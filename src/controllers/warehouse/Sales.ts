import { NextFunction, Request, Response } from "express";
import RetailerPurchase from "../../models/retailer/RetailerPurchase";

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

export default {
  readWarehouseSales,
  updateOrderStatus,
};
