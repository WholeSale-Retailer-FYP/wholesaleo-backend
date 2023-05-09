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
const RetailerInventory_1 = __importDefault(require("../../models/retailer/RetailerInventory"));
const createRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, weight, originalPrice, sellingPrice, barcodeId, retailerId, itemId, } = req.body;
    try {
        const retailer = yield RetailerInventory_1.default.create({
            quantity,
            weight,
            originalPrice,
            sellingPrice,
            barcodeId,
            retailerId,
            itemId,
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
            { path: "itemId", select: "name" },
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
// todo: add to postman
const readRetailerInventoryOfRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerId = req.params.retailerId;
        const retailer = yield RetailerInventory_1.default.find({
            retailerId,
        }).populate([
            { path: "itemId", select: ["name", "image"] },
            { path: "retailerId", select: "shopName" },
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
            { path: "itemId" },
            { path: "retailerId", select: "shopName" },
        ]);
        res.status(200).json({ data: retailers });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, quantity, weight, originalPrice, sellingPrice, barcodeId, retailerId, itemId, } = req.body;
        const updatedRetailerInventory = yield RetailerInventory_1.default.updateOne({ _id }, {
            quantity: quantity,
            weight: weight,
            originalPrice: originalPrice,
            sellingPrice: sellingPrice,
            barcodeId: barcodeId,
            retailerId: retailerId,
            itemId: itemId,
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
        const _id = req.params.retailerId;
        const retailer = yield RetailerInventory_1.default.deleteOne({ _id });
        if (!retailer)
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
    updateRetailerInventory,
    deleteRetailerInventory,
};
