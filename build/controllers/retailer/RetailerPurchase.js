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
const createRetailerPurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { retailerId } = req.body;
    try {
        const retailerPurchase = yield RetailerPurchase_1.default.create({
            retailerId,
        });
        res.status(201).json({ data: retailerPurchase });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerPurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerPurchaseId = req.params.retailerPurchaseId;
        const retailerPurchase = yield RetailerPurchase_1.default.findById(retailerPurchaseId).populate({
            path: "retailerId",
            select: ["firstName", "lastName", "shopName"],
        });
        if (!retailerPurchase) {
            throw new Error("RetailerPurchase Not Found");
        }
        res.status(200).json({ data: retailerPurchase });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerPurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerPurchases = yield RetailerPurchase_1.default.find().populate({
            path: "retailerId",
            select: ["firstName", "lastName", "shopName"],
        });
        res.status(200).json({ data: retailerPurchases });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerPurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, retailerEmployeeId } = req.body;
        const updatedRetailerPurchase = yield RetailerPurchase_1.default.updateOne({ _id }, { retailerEmployeeId: retailerEmployeeId });
        if (!updatedRetailerPurchase)
            throw new Error("RetailerPurchase not found!");
        res.status(201).json({ data: updatedRetailerPurchase });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerPurchase = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerPurchaseId;
        const retailerPurchase = yield RetailerPurchase_1.default.deleteOne({ _id });
        if (!retailerPurchase)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerPurchase,
    readAllRetailerPurchase,
    readRetailerPurchase,
    updateRetailerPurchase,
    deleteRetailerPurchase,
};
