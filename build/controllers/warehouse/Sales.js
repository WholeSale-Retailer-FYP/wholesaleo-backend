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
const RetailerPurchase_1 = __importDefault(require("../../models/retailer/RetailerPurchase"));
const RetailerPurchaseData_1 = __importDefault(require("../../models/retailer/RetailerPurchaseData"));
const readWarehouseSales = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const sales = yield RetailerPurchase_1.default.find({ warehouseId }).populate("retailerId", ["shopName"]);
        if (!sales) {
            throw new Error("RetailerPurchase Not Found");
        }
        res.status(200).json({ data: sales });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateOrderStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, orderStatus } = req.body;
        const update = yield RetailerPurchase_1.default.updateOne({ _id: _id }, { $set: { orderStatus } });
        if (!update) {
            throw new Error("RetailerPurchase Not Found");
        }
        res.status(200).json({ data: update });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// TODO: Add Date Range
const finances = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const sales = yield RetailerPurchase_1.default.find({ warehouseId });
        if (!sales) {
            throw new Error("RetailerPurchase Not Found");
        }
        const salesIds = sales.map((sale) => sale._id);
        // find all retailerpurchasedata with matching -id from sales
        const salesData = yield RetailerPurchaseData_1.default.find({
            retailerPurchaseId: { $in: salesIds },
        }).populate("warehouseInventoryId");
        // use reducer to calculate total sellingPrice
        const totalSellingPrice = salesData.reduce((acc, curr) => acc + curr.warehouseInventoryId.sellingPrice, 0);
        const totalPurchasePrice = salesData.reduce((acc, curr) => acc + curr.warehouseInventoryId.originalPrice, 0);
        const numItemsSold = salesData.reduce((acc, curr) => acc + curr.warehouseInventoryId.quantity, 0);
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
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    readWarehouseSales,
    updateOrderStatus,
    finances,
};
