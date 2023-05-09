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
const Warehouse_1 = __importDefault(require("../../models/warehouse/Warehouse"));
// Routes needed:
// Verify warehouse
const createWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cityId, regionId, provinceId, longitude, latitude } = req.body;
    try {
        const warehouse = yield Warehouse_1.default.create({
            name,
            cityId,
            regionId,
            provinceId,
            longitude,
            latitude,
        });
        res.status(201).json({ data: warehouse });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const warehouse = yield Warehouse_1.default.findById(warehouseId).populate([
            "cityId",
            "regionId",
            "provinceId",
        ]);
        if (!warehouse) {
            throw new Error("Warehouse Not Found");
        }
        res.status(200).json({ data: warehouse });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouses = yield Warehouse_1.default.find().populate([
            "cityId",
            "regionId",
            "provinceId",
        ]);
        res.status(200).json({ data: warehouses });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const verifyWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const updatedWarehouse = yield Warehouse_1.default.updateOne({ _id }, {
            verified: true,
        });
        if (!updatedWarehouse)
            throw new Error("Warehouse not found!");
        res.status(201).json({ data: updatedWarehouse });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, cityId, regionId, provinceId, longitude, latitude } = req.body;
        const updatedWarehouse = yield Warehouse_1.default.updateOne({ _id }, {
            name: name,
            cityId: cityId,
            regionId: regionId,
            provinceId: provinceId,
            longitude: longitude,
            latitude: latitude,
        });
        if (!updatedWarehouse)
            throw new Error("Warehouse not found!");
        res.status(201).json({ data: updatedWarehouse });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.warehouseId;
        const warehouse = yield Warehouse_1.default.deleteOne({ _id });
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
    createWarehouse,
    readAllWarehouse,
    readWarehouse,
    verifyWarehouse,
    updateWarehouse,
    deleteWarehouse,
};
