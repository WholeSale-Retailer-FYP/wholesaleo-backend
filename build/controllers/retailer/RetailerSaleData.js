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
const RetailerSaleData_1 = __importDefault(require("../../models/retailer/RetailerSaleData"));
const createRetailerSaleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { retailerInventoryId, quantity, retailerPOSId } = req.body;
    try {
        const retailerSaleData = yield RetailerSaleData_1.default.create({
            retailerInventoryId,
            quantity,
            retailerPOSId,
        });
        res.status(201).json({ data: retailerSaleData });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerSaleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerSaleDataId = req.params.retailerSaleDataId;
        const retailerSaleData = yield RetailerSaleData_1.default.findById(retailerSaleDataId).populate([
            {
                path: "retailerPOSId",
                populate: {
                    path: "retailerEmployeeId",
                    select: ["firstName", "lastName", "role"],
                },
            },
            {
                path: "retailerInventoryId",
                select: ["barcodeId", "sellingPrice"],
                populate: {
                    path: "itemId",
                    select: ["name", "image"],
                },
            },
        ]);
        if (!retailerSaleData) {
            throw new Error("RetailerSaleData Not Found");
        }
        res.status(200).json({ data: retailerSaleData });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerSaleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerSaleDatas = yield RetailerSaleData_1.default.find().populate([
            {
                path: "retailerPOSId",
                populate: {
                    path: "retailerEmployeeId",
                    select: ["firstName", "lastName", "role"],
                },
            },
            {
                path: "retailerInventoryId",
                select: ["barcodeId", "sellingPrice"],
                populate: {
                    path: "itemId",
                    select: ["name", "image"],
                },
            },
        ]);
        res.status(200).json({ data: retailerSaleDatas });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerSaleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, retailerInventoryId, quantity, retailerPOSId } = req.body;
        const updatedRetailerSaleData = yield RetailerSaleData_1.default.updateOne({ _id }, { retailerInventoryId, quantity, retailerPOSId });
        if (!updatedRetailerSaleData)
            throw new Error("RetailerSaleData not found!");
        res.status(201).json({ data: updatedRetailerSaleData });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerSaleData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerSaleDataId;
        const retailerSaleData = yield RetailerSaleData_1.default.deleteOne({ _id });
        if (!retailerSaleData)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerSaleData,
    readAllRetailerSaleData,
    readRetailerSaleData,
    updateRetailerSaleData,
    deleteRetailerSaleData,
};
