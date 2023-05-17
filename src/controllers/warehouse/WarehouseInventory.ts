import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import WarehouseInventory from "../../models/warehouse/WarehouseInventory";
const { BigQuery } = require("@google-cloud/bigquery");

const createWarehouseInventory = async (
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
    warehouseId,
    itemId,
    types,
  } = req.body;
  try {
    const warehouse = await WarehouseInventory.create({
      quantity,
      weight,
      originalPrice,
      sellingPrice,
      barcodeId,
      warehouseId,
      itemId,
      types,
    });
    res.status(201).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseInventoryId = req.params.warehouseInventoryId;
    const warehouse = await WarehouseInventory.findById(
      warehouseInventoryId
    ).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);
    if (!warehouse) {
      throw new Error("WarehouseInventory Not Found");
    }
    res.status(200).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readInventoryOfWarehouse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const warehouse = await WarehouseInventory.find({
      warehouseId,
    }).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);

    if (!warehouse) {
      throw new Error("WarehouseInventory Not Found");
    }

    res.status(200).json({ data: warehouse });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

const readWarehouseItemOfCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouseId = req.params.warehouseId;
    const itemCategoryId = req.params.itemCategoryId;
    let warehouseInventory = await WarehouseInventory.find({
      warehouseId,
    }).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);

    if (!warehouseInventory) {
      throw new Error("WarehouseInventory Not Found");
    }
    console.log(warehouseInventory);
    warehouseInventory = warehouseInventory.filter((inventory) => {
      return inventory.itemId.itemCategoryId._id.equals(itemCategoryId);
    });

    res.status(200).json({ data: warehouseInventory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const readAllWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const warehouses = await WarehouseInventory.find().populate([
      { path: "itemId" },
      { path: "warehouseId", select: "name" },
    ]);
    res.status(200).json({ data: warehouses });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const searchItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { query, warehouseId } = req.params;
    var q = new RegExp(query, "i");
    let items = await WarehouseInventory.find({
      warehouseId,
    }).populate({
      path: "itemId",
      options: { retainNullValues: false },
      match: { $and: [{ name: q }] },
    });

    if (!items) throw new Error("Error Fetching Items!");

    items = items.filter((item) => {
      return item.itemId != null;
    });

    res.status(200).json({ data: items });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const updateWarehouseInventory = async (
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
      warehouseId,
      itemId,
      types,
    } = req.body;
    const updatedWarehouseInventory = await WarehouseInventory.updateOne(
      { _id },
      {
        quantity,
        weight,
        originalPrice,
        sellingPrice,
        barcodeId,
        warehouseId,
        itemId,
        types,
      }
    );
    if (
      updatedWarehouseInventory.acknowledged &&
      updatedWarehouseInventory.modifiedCount == 0
    )
      throw new Error("WarehouseInventory not found!");
    res.status(201).json({ data: updatedWarehouseInventory });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

interface bigQueryResponse {
  warehouseItem?: string;

  warehouseId?: string;
  itemId?: string;
  warehouseInventory?: object;

  forecast_value: number;
  toBuy?: number;
  warehouseInventoryQuantity?: number;
  lower_bound: number;
  upper_bound: number;

  timestamp?:
    | string
    | {
        value: string;
      };
}

const inventoryForecastDetailed = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { warehouseId, numDays } = req.params;
    const bq = new BigQuery({
      credentials: JSON.parse(process.env.GOOGLE_BIG_QUERY_CREDENTIALS!),
      projectId: "wholesaleo-fyp",
    });

    const query = `
              SELECT
              warehouseItem,
              SUM(forecast_value) AS forecast_value,
              SUM(prediction_interval_lower_bound) AS lower_bound,
              SUM(prediction_interval_upper_bound) AS upper_bound,
              FROM
                ML.FORECAST(MODEL \`wholesaleo-fyp.warehouse.sales_forecasting\`,
                            STRUCT(${numDays} AS horizon, 0.8 AS confidence_level))
              WHERE
                warehouseItem LIKE '${warehouseId}_%'
              GROUP BY
              warehouseItem
              `;

    const [job] = await bq.createQueryJob({
      query: query,
    });
    console.log(`Job ${job.id} started.`);

    let [rows] = await job.getQueryResults();
    console.log("first");
    rows.forEach((row: bigQueryResponse) => {
      const { forecast_value, lower_bound, upper_bound } = row;
      const [warehouseId, itemId] = row.warehouseItem!.split("_");

      row.itemId = itemId;
      row.warehouseId = warehouseId;

      row.forecast_value = Math.floor(forecast_value!);
      row.lower_bound = Math.floor(lower_bound!);
      row.upper_bound = Math.floor(upper_bound!);
      if (typeof row.timestamp === "object" && row.timestamp !== null)
        row.timestamp = row.timestamp!.value;
      delete row.warehouseItem;
    });

    console.log("second");

    const warehouseInventory = await WarehouseInventory.find({
      warehouseId,
    }).populate({
      path: "itemId",
      select: ["name", "image", "_id", "cartonSize"],
    });

    const finalRows = rows
      .map((row: bigQueryResponse) => {
        const { itemId, forecast_value } = row;

        const warehouseInventoryItem = warehouseInventory.find((item) => {
          if (!item.itemId) {
            console.log(item);
            return false;
          }
          return item.itemId._id == itemId;
        });

        if (warehouseInventoryItem) {
          const { quantity } = warehouseInventoryItem;
          if (quantity! < forecast_value!) {
            row.toBuy = forecast_value! - quantity!;
            row.warehouseInventoryQuantity = quantity;
            row.itemId = warehouseInventoryItem.itemId;
          } else {
            return;
          }
          return row;
        } else return;
      })
      .filter((row: bigQueryResponse) => row != null);

    console.log("third");

    res.status(200).json({ data: finalRows });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

const deleteWarehouseInventory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _id = req.params.warehouseInventoryId;
    const warehouse = await WarehouseInventory.deleteOne({ _id });
    if (warehouse && warehouse.deletedCount < 1)
      throw new Error("Could not delete!");
    res.status(201).json({ data: true, message: "Deletion was successful!" });
  } catch (error) {
    if (error instanceof Error)
      res.status(500).json({ message: error.message });
  }
};

export default {
  createWarehouseInventory,
  readAllWarehouseInventory,
  readInventoryOfWarehouse,
  readWarehouseItemOfCategory,
  readWarehouseInventory,
  searchItem,
  updateWarehouseInventory,
  inventoryForecastDetailed,
  deleteWarehouseInventory,
};
