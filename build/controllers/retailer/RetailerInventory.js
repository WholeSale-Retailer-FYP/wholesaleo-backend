"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CustomItem_1 = __importDefault(require("../../models/retailer/CustomItem"));
const RetailerInventory_1 = __importDefault(require("../../models/retailer/RetailerInventory"));
const CustomItem_2 = require("./CustomItem");
const { BigQuery } = require("@google-cloud/bigquery");
const createRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, weight, originalPrice, sellingPrice, barcodeId, retailerId, warehouseInventoryId, types, } = req.body;
    try {
        const retailer = yield RetailerInventory_1.default.create({
            quantity,
            weight,
            originalPrice,
            sellingPrice,
            barcodeId,
            retailerId,
            warehouseInventoryId,
            types,
        });
        res.status(201).json({ data: retailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// read single entry of table
const readRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerInventoryId = req.params.retailerInventoryId;
        const retailer = yield RetailerInventory_1.default.findById(retailerInventoryId).populate([
            // { path: "warehouseInventoryId", select: "name" },
            { path: "retailerId", select: "name" },
        ]);
        if (!retailer) {
            throw new Error("RetailerInventory Not Found");
        }
        res.status(200).json({ data: retailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// get inventory of specific retailer
const readRetailerInventoryOfRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerId = req.params.retailerId;
        const retailer = yield RetailerInventory_1.default.find({
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
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailers = yield RetailerInventory_1.default.find().populate([
            {
                path: "warehouseInventoryId",
                select: "weight",
                populate: { path: "itemId", select: ["name", "image"] },
            },
            { path: "retailerId", select: "shopName" },
        ]);
        res.status(200).json({ data: retailers });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readDefaultAndCustomInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerId = req.params.retailerId;
        let retailerDefaultInventory = yield RetailerInventory_1.default.find({
            retailerId,
        }).populate([
            { path: "retailerId", select: "shopName" },
            {
                path: "warehouseInventoryId",
                select: ["weight", "itemId"],
                populate: {
                    path: "itemId",
                    populate: { path: "itemCategoryId", select: "name" },
                },
            },
        ]);
        if (!retailerDefaultInventory)
            throw new Error("RetailerInventory Not Found");
        const retailerCustomInventory = yield CustomItem_1.default.find({
            retailerId,
        }).populate([
            {
                path: "customCategoryId",
                select: "name",
            },
            {
                path: "retailerId",
                select: "shopName",
            },
        ]);
        if (!retailerCustomInventory)
            throw new Error("Custom Inventory Not Found");
        const copyCustomInventory = (0, CustomItem_2.convertCustomItemToDefaultItem)(retailerCustomInventory);
        res
            .status(200)
            .json({ data: [...retailerDefaultInventory, ...copyCustomInventory] });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const credentials = {
    type: process.env.TYPE,
    project_id: process.env.PROJECT_ID,
    private_key_id: process.env.PRIVATE_KEY_ID,
    private_key: process.env.PRIVATE_KEY,
    client_email: process.env.CLIENT_EMAIL,
    client_id: process.env.CLIENT_ID,
    auth_uri: process.env.AUTH_URI,
    token_uri: process.env.TOKEN_URI,
    auth_provider_x509_cert_url: process.env.AUTH_PROVIDER,
    client_x509_cert_url: process.env.CLIENT_URL,
};
const inventoryForecast = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(credentials);
    try {
        const { retailerId, numDays } = req.params;
        const bq = new BigQuery({
            credentials: JSON.parse(process.env.GOOGLE_BIG_QUERY_CREDENTIALS),
            // keyFilename: "src/config/wholesaleo-fyp-3a9962a0bae8.json",
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
        const [job] = yield bq.createQueryJob({
            query: query,
        });
        console.log(`Job ${job.id} started.`);
        let [rows] = yield job.getQueryResults();
        rows.forEach((row) => {
            const { forecast_value, lower_bound, upper_bound } = row;
            const [retailerId, itemId] = row.retailerItem.split("_");
            row.itemId = itemId;
            row.retailerId = retailerId;
            row.forecast_value = Math.floor(forecast_value);
            row.lower_bound = Math.floor(lower_bound);
            row.upper_bound = Math.floor(upper_bound);
            delete row.retailerItem;
        });
        const retailerInventory = yield RetailerInventory_1.default.find({
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
            .map((row) => {
            const { itemId, forecast_value } = row;
            const retailerInventoryItem = retailerInventory.find((item) => {
                const warehouseInventoryId = item.warehouseInventoryId;
                return warehouseInventoryId.itemId._id == itemId;
            });
            if (retailerInventoryItem) {
                const { quantity } = retailerInventoryItem;
                if (quantity < forecast_value) {
                    row.toBuy = forecast_value - quantity;
                    row.retailerInventoryQuantity = quantity;
                    row.warehouseInventory = retailerInventoryItem.warehouseInventoryId;
                }
                else {
                    return;
                }
                return row;
            }
            else
                return;
        })
            .filter((row) => row != null);
        res.status(200).json({ data: finalRows });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const inventoryForecastDetailed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
              forecast_value ,
              prediction_interval_lower_bound AS lower_bound,
              prediction_interval_upper_bound AS upper_bound,
              forecast_timestamp AS timestamp
              FROM
                ML.FORECAST(MODEL \`wholesaleo-fyp.retailer.sales_forecasting\`,
                            STRUCT(${numDays} AS horizon, 0.8 AS confidence_level))
              WHERE
                retailerItem LIKE '${retailerId}_%'
              `;
        const [job] = yield bq.createQueryJob({
            query: query,
        });
        console.log(`Job ${job.id} started.`);
        let [rows] = yield job.getQueryResults();
        rows.forEach((row) => {
            const { forecast_value, lower_bound, upper_bound } = row;
            const [retailerId, itemId] = row.retailerItem.split("_");
            row.itemId = itemId;
            row.retailerId = retailerId;
            row.forecast_value = Math.floor(forecast_value);
            row.lower_bound = Math.floor(lower_bound);
            row.upper_bound = Math.floor(upper_bound);
            if (typeof row.timestamp === "object" && row.timestamp !== null)
                row.timestamp = row.timestamp.value;
            delete row.retailerItem;
        });
        const retailerInventory = yield RetailerInventory_1.default.find({
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
            .map((row) => {
            const { itemId, forecast_value } = row;
            const retailerInventoryItem = retailerInventory.find((item) => {
                const warehouseInventoryId = item.warehouseInventoryId;
                return warehouseInventoryId.itemId._id == itemId;
            });
            if (retailerInventoryItem) {
                const { quantity } = retailerInventoryItem;
                if (quantity < forecast_value) {
                    row.toBuy = forecast_value - quantity;
                    row.retailerInventoryQuantity = quantity;
                    row.warehouseInventory = retailerInventoryItem.warehouseInventoryId;
                }
                else {
                    return;
                }
                return row;
            }
            else
                return;
        })
            .filter((row) => row != null);
        res.status(200).json({ data: finalRows });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, quantity, weight, originalPrice, sellingPrice, barcodeId, retailerId, warehouseInventoryId, types, } = req.body;
        const updatedRetailerInventory = yield RetailerInventory_1.default.updateOne({ _id }, {
            quantity: quantity,
            weight: weight,
            originalPrice: originalPrice,
            sellingPrice: sellingPrice,
            barcodeId: barcodeId,
            retailerId: retailerId,
            warehouseInventoryId,
            types,
        });
        if (!updatedRetailerInventory)
            throw new Error("RetailerInventory not found!");
        res.status(201).json({ data: updatedRetailerInventory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerInventoryId;
        const retailer = yield RetailerInventory_1.default.deleteOne({ _id });
        if (retailer.acknowledged && retailer.deletedCount == 0)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerInventory,
    readAllRetailerInventory,
    readRetailerInventoryOfRetailer,
    readRetailerInventory,
    readDefaultAndCustomInventory,
    inventoryForecast,
    inventoryForecastDetailed,
    updateRetailerInventory,
    deleteRetailerInventory,
};
