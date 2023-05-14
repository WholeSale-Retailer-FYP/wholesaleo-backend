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
    const { quantity, weight, originalPrice, sellingPrice, barcodeId, warehouseId, itemId, types, } = req.body;
    try {
        const warehouse = yield WarehouseInventory_1.default.create({
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
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseInventoryId = req.params.warehouseInventoryId;
        const warehouse = yield WarehouseInventory_1.default.findById(warehouseInventoryId).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);
        if (!warehouse) {
            throw new Error("WarehouseInventory Not Found");
        }
        res.status(200).json({ data: warehouse });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readInventoryOfWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const warehouse = yield WarehouseInventory_1.default.find({
            warehouseId,
        }).populate([{ path: "itemId" }, { path: "warehouseId", select: "name" }]);
        if (!warehouse) {
            throw new Error("WarehouseInventory Not Found");
        }
        res.status(200).json({ data: warehouse });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readWarehouseItemOfCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const itemCategoryId = req.params.itemCategoryId;
        let warehouseInventory = yield WarehouseInventory_1.default.find({
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
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouses = yield WarehouseInventory_1.default.find().populate([
            { path: "itemId" },
            { path: "warehouseId", select: "name" },
        ]);
        res.status(200).json({ data: warehouses });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const searchItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { query, warehouseId } = req.params;
        var q = new RegExp(query, "i");
        let items = yield WarehouseInventory_1.default.find({
            warehouseId,
        }).populate({
            path: "itemId",
            options: { retainNullValues: false },
            match: { $and: [{ name: q }] },
        });
        if (!items)
            throw new Error("Error Fetching Items!");
        items = items.filter((item) => {
            return item.itemId != null;
        });
        res.status(200).json({ data: items });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateWarehouseInventory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, quantity, weight, originalPrice, sellingPrice, barcodeId, warehouseId, itemId, types, } = req.body;
        const updatedWarehouseInventory = yield WarehouseInventory_1.default.updateOne({ _id }, {
            quantity,
            weight,
            originalPrice,
            sellingPrice,
            barcodeId,
            warehouseId,
            itemId,
            types,
        });
        if (updatedWarehouseInventory.acknowledged &&
            updatedWarehouseInventory.modifiedCount == 0)
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
        console.log(warehouse);
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
    readInventoryOfWarehouse,
    readWarehouseItemOfCategory,
    readWarehouseInventory,
    searchItem,
    updateWarehouseInventory,
    deleteWarehouseInventory,
};
