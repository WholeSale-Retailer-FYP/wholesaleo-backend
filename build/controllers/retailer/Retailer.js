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
const Retailer_1 = __importDefault(require("../../models/retailer/Retailer"));
const createRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopName, postalCode, latitude, longitude, regionId, warehouseId, amountPayable, shopSize, } = req.body;
    try {
        const retailer = yield Retailer_1.default.create({
            shopName,
            postalCode,
            latitude,
            longitude,
            regionId,
            warehouseId,
            amountPayable,
            shopSize,
        });
        res.status(201).json({ data: retailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerId = req.params.retailerId;
        const retailer = yield Retailer_1.default.findById(retailerId).populate(["regionId"]);
        if (!retailer) {
            throw new Error("Retailer Not Found");
        }
        res.status(200).json({ data: retailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailers = yield Retailer_1.default.find().populate(["regionId"]);
        res.status(200).json({ data: retailers });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const verifyRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const updatedRetailer = yield Retailer_1.default.updateOne({ _id }, {
            verified: true,
        });
        if (!updatedRetailer)
            throw new Error("Retailer not found!");
        res.status(201).json({ data: updatedRetailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, shopName, postalCode, latitude, longitude, regionId, warehouseId, amountPayable, shopSize, } = req.body;
        const updatedRetailer = yield Retailer_1.default.updateOne({ _id }, {
            shopName,
            postalCode,
            latitude,
            longitude,
            regionId,
            warehouseId,
            amountPayable,
            shopSize,
        });
        if (!updatedRetailer)
            throw new Error("Retailer not found!");
        res.status(201).json({ data: updatedRetailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerId;
        const retailer = yield Retailer_1.default.deleteOne({ _id });
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
    createRetailer,
    readAllRetailer,
    readRetailer,
    verifyRetailer,
    updateRetailer,
    deleteRetailer,
};
