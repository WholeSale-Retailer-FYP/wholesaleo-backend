import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import RetailerInventory from "../../models/retailer/RetailerInventory";
const { BigQuery } = require("@google-cloud/bigquery");

const createRetailerInventory = async (
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
    retailerId,
    warehouseInventoryId,
  } = req.body;
  try {
    const retailer = await RetailerInventory.create({
      quantity,
      weight,
      originalPrice,
      sellingPrice,
      barcodeId,
      retailerId,
      warehouseInventoryId,
    });
    res.status(201).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// read single entry of table
const readRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerInventoryId = req.params.retailerInventoryId;
    const retailer = await RetailerInventory.findById(
      retailerInventoryId
    ).populate([
      // { path: "warehouseInventoryId", select: "name" },
      { path: "retailerId", select: "name" },
    ]);
    if (!retailer) {
      throw new Error("RetailerInventory Not Found");
    }
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

// get inventory of specific retailer
const readRetailerInventoryOfRetailer = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailerId = req.params.retailerId;
    const retailer = await RetailerInventory.find({
      retailerId,
    }).populate([
      { path: "retailerId", select: "shopName" },
      {
        path: "warehouseInventoryId",
        select: "weight",
        populate: { path: "itemId", select: ["name", "image"] },
      },
    ]);

    if (!retailer) {
      throw new Error("RetailerInventory Not Found");
    }
    res.status(200).json({ data: retailer });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const retailers = await RetailerInventory.find().populate([
      {
        path: "warehouseInventoryId",
        select: "weight",
        populate: { path: "itemId", select: ["name", "image"] },
      },
      { path: "retailerId", select: "shopName" },
    ]);
    res.status(200).json({ data: retailers });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

interface bigQueryResponse {
  retailerItem?: string;

  retailerId?: string;
  itemId?: string;
  warehouseInventory?: object;

  forecast_value: number;
  toBuy?: number;
  retailerInventoryQuantity?: number;
  lower_bound: number;
  upper_bound: number;
}

// const credentials = {
//   type: process.env.TYPE,
//   project_id: process.env.PROJECT_ID,
//   private_key_id: process.env.PRIVATE_KEY_ID,
//   private_key: process.env.PRIVATE_KEY,
//   client_email: process.env.CLIENT_EMAIL,
//   client_id: process.env.CLIENT_ID,
//   auth_uri: process.env.AUTH_URI,
//   token_uri: process.env.TOKEN_URI,
//   auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
//   client_x509_cert_url: process.env.CLIENT_URL,
// };

const inventoryForecast = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { retailerId, numDays } = req.params;
    const bq = new BigQuery({
      // credentials,
      keyFilename: "src/config/wholesaleo-fyp-3a9962a0bae8.json",
      projectId: "wholesaleo-fyp",
    });

    const query = `
              SELECT
              retailerItem,
              SUM(forecast_value) AS forecast_value,
              SUM(prediction_interval_lower_bound) AS lower_bound,
              SUM(prediction_interval_upper_bound) AS upper_bound,
              FROM
                ML.FORECAST(MODEL \`wholesaleo-fyp.retailer.sales_forecasting\`,
                            STRUCT(${numDays} AS horizon, 0.8 AS confidence_level))
              WHERE
                retailerItem LIKE '${retailerId}_%'
              GROUP BY
                retailerItem
              `;

    const [job] = await bq.createQueryJob({
      query: query,
    });
    console.log(`Job ${job.id} started.`);

    let [rows] = await job.getQueryResults();

    rows.forEach((row: bigQueryResponse) => {
      const { forecast_value, lower_bound, upper_bound } = row;
      const [retailerId, itemId] = row.retailerItem!.split("_");

      row.itemId = itemId;
      row.retailerId = retailerId;

      row.forecast_value = Math.floor(forecast_value!);
      row.lower_bound = Math.floor(lower_bound!);
      row.upper_bound = Math.floor(upper_bound!);
      delete row.retailerItem;
    });

    const retailerInventory = await RetailerInventory.find({
      retailerId,
    }).populate({
      path: "warehouseInventoryId",
      select: ["sellingPrice", "weight"],
      populate: {
        path: "itemId",
        select: ["name", "image", "_id"],
      },
    });

    // compare itemId in retailerInventory and itemId in rows add itemId of items where retailerIventory is less than forecast_value and show the difference
    const finalRows = rows
      .map((row: bigQueryResponse) => {
        const { itemId, forecast_value } = row;

        const retailerInventoryItem = retailerInventory.find((item) => {
          const warehouseInventoryId = item.warehouseInventoryId as any;
          return warehouseInventoryId.itemId._id == itemId;
        });
        if (retailerInventoryItem) {
          const { quantity } = retailerInventoryItem;
          if (quantity! < forecast_value!) {
            row.toBuy = forecast_value! - quantity!;
            row.retailerInventoryQuantity = quantity;
            row.warehouseInventory = retailerInventoryItem.warehouseInventoryId;
          } else {
            return;
          }
          return row;
        } else return;
      })
      .filter((row: bigQueryResponse) => row != null);

    res.status(200).json({ data: finalRows });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateRetailerInventory = async (
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
      retailerId,
      warehouseInventoryId,
    } = req.body;
    const updatedRetailerInventory = await RetailerInventory.updateOne(
      { _id },
      {
        quantity: quantity,
        weight: weight,
        originalPrice: originalPrice,
        sellingPrice: sellingPrice,
        barcodeId: barcodeId,
        retailerId: retailerId,
        warehouseInventoryId,
      }
    );
    if (!updatedRetailerInventory)
      throw new Error("RetailerInventory not found!");
    res.status(201).json({ data: updatedRetailerInventory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteRetailerInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.retailerInventoryId;
    const retailer = await RetailerInventory.deleteOne({ _id });
    if (retailer.acknowledged && retailer.deletedCount == 0)
      throw new Error("Could not delete!");

    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createRetailerInventory,
  readAllRetailerInventory,
  readRetailerInventoryOfRetailer,
  readRetailerInventory,
  inventoryForecast,
  updateRetailerInventory,
  deleteRetailerInventory,
};
