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
const RetailerFavorites_1 = __importDefault(require("../../models/retailer/RetailerFavorites"));
const createRetailerFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { retailerId, warehouseId } = req.body;
    try {
        const retailerFavorites = yield RetailerFavorites_1.default.create({
            retailerId,
            warehouseId,
        });
        res.status(201).json({ data: retailerFavorites });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerFavoritesId = req.params.retailerFavoritesId;
        const retailerFavorites = yield RetailerFavorites_1.default.findById(retailerFavoritesId);
        if (!retailerFavorites) {
            throw new Error("RetailerFavorites Not Found");
        }
        res.status(200).json({ data: retailerFavorites });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerFavoritess = yield RetailerFavorites_1.default.find();
        res.status(200).json({ data: retailerFavoritess });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name } = req.body;
        const updatedRetailerFavorites = yield RetailerFavorites_1.default.updateOne({ _id }, { name: name });
        if (!updatedRetailerFavorites)
            throw new Error("RetailerFavorites not found!");
        res.status(201).json({ data: updatedRetailerFavorites });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerFavorites = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerFavoritesId;
        const retailerFavorites = yield RetailerFavorites_1.default.deleteOne({ _id });
        if (!retailerFavorites)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerFavorites,
    readAllRetailerFavorites,
    readRetailerFavorites,
    updateRetailerFavorites,
    deleteRetailerFavorites,
};
