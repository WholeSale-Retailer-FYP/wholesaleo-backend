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
const RetailerPurchaseData_1 = __importDefault(require("../../models/retailer/RetailerPurchaseData"));
const createRetailerPurchaseData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { warehouseInventoryId, quantity, retailerPurchaseId } = req.body;
    try {
        const retailerPurchaseData = yield RetailerPurchaseData_1.default.create({
            warehouseInventoryId,
            quantity,
            retailerPurchaseId,
        });
        res.status(201).json({ data: retailerPurchaseData });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerPurchaseData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerPurchaseDataId = req.params.retailerPurchaseDataId;
        const retailerPurchaseData = yield RetailerPurchaseData_1.default.findById(retailerPurchaseDataId).populate([
            {
                path: "retailerPurchaseId",
                populate: {
                    path: "retailerId",
                    select: ["firstName", "lastName", "role"],
                },
            },
            {
                path: "warehouseInventoryId",
                select: ["barcodeId", "sellingPrice"],
                populate: {
                    path: "itemId",
                    select: ["name", "image"],
                },
            },
        ]);
        if (!retailerPurchaseData) {
            throw new Error("RetailerPurchaseData Not Found");
        }
        res.status(200).json({ data: retailerPurchaseData });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerPurchaseData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerPurchaseDatas = yield RetailerPurchaseData_1.default.find().populate([
            {
                path: "retailerPurchaseId",
                populate: {
                    path: "retailerId",
                    select: ["firstName", "lastName", "role"],
                },
            },
            {
                path: "warehouseInventoryId",
                select: ["barcodeId", "sellingPrice"],
                populate: {
                    path: "itemId",
                    select: ["name", "image"],
                },
            },
        ]);
        res.status(200).json({ data: retailerPurchaseDatas });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerPurchaseData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, warehouseInventoryId, quantity, retailerPurchaseId } = req.body;
        const updatedRetailerPurchaseData = yield RetailerPurchaseData_1.default.updateOne({ _id }, { warehouseInventoryId, quantity, retailerPurchaseId });
        if (!updatedRetailerPurchaseData)
            throw new Error("RetailerPurchaseData not found!");
        res.status(201).json({ data: updatedRetailerPurchaseData });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerPurchaseData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerPurchaseDataId;
        const retailerPurchaseData = yield RetailerPurchaseData_1.default.deleteOne({ _id });
        if (!retailerPurchaseData)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerPurchaseData,
    readAllRetailerPurchaseData,
    readRetailerPurchaseData,
    updateRetailerPurchaseData,
    deleteRetailerPurchaseData,
};
