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
const WarehouseInventory_1 = __importDefault(require("../../models/warehouse/WarehouseInventory"));
const createWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { quantity, weight, originalPrice, sellingPrice, barcodeId, warehouseId, itemId, } = req.body;
    try {
        const warehouse = yield WarehouseInventory_1.default.create({
            quantity,
            weight,
            originalPrice,
            sellingPrice,
            barcodeId,
            warehouseId,
            itemId,
        });
        res.status(201).json({ data: warehouse });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseInventoryId = req.params.warehouseInventoryId;
        const warehouse = yield WarehouseInventory_1.default.findById(warehouseInventoryId).populate([
            { path: "itemId", select: "name" },
            { path: "warehouseId", select: "name" },
        ]);
        if (warehouse) {
            res.status(200).json({ data: warehouse });
        }
        throw new Error("WarehouseInventory Not Found");
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readWarehouseInventoryOfWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const warehouse = yield WarehouseInventory_1.default.find({
            warehouseId,
        }).populate([
            { path: "itemId", select: "name" },
            { path: "warehouseId", select: "name" },
        ]);
        if (!warehouse) {
            throw new Error("WarehouseInventory Not Found");
        }
        res.status(200).json({ data: warehouse });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readAllWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouses = yield WarehouseInventory_1.default.find().populate([
            { path: "itemId", select: "name" },
            { path: "warehouseId", select: "name" },
        ]);
        res.status(200).json({ data: warehouses });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, quantity, weight, originalPrice, sellingPrice, barcodeId, warehouseId, itemId, } = req.body;
        const updatedWarehouseInventory = yield WarehouseInventory_1.default.updateOne({ _id }, {
            quantity: quantity,
            weight: weight,
            originalPrice: originalPrice,
            sellingPrice: sellingPrice,
            barcodeId: barcodeId,
            warehouseId: warehouseId,
            itemId: itemId,
        });
        if (!updatedWarehouseInventory)
            throw new Error("WarehouseInventory not found!");
        res.status(201).json({ data: updatedWarehouseInventory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.warehouseId;
        const warehouse = yield WarehouseInventory_1.default.deleteOne({ _id });
        if (!warehouse)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createWarehouseInventory,
    readAllWarehouseInventory,
    readWarehouseInventoryOfWarehouse,
    readWarehouseInventory,
    updateWarehouseInventory,
    deleteWarehouseInventory,
};
