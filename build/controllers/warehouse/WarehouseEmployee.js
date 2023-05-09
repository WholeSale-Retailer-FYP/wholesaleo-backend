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
const WarehouseEmployee_1 = __importDefault(require("../../models/warehouse/WarehouseEmployee"));
const bcrypt = require("bcrypt");
// TODO: user Login
const createWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cnic, phoneNumber, role, password, warehouseId } = req.body;
    try {
        const salt = yield bcrypt.genSalt();
        const hashedPassword = yield bcrypt.hash(password, salt);
        const warehouse = yield WarehouseEmployee_1.default.create({
            name,
            cnic,
            phoneNumber,
            role,
            password: hashedPassword,
            warehouseId,
        });
        res.status(201).json({ data: warehouse });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const warehouse = yield WarehouseEmployee_1.default.findById(warehouseId);
        if (!warehouse) {
            throw new Error("WarehouseEmployee Not Found");
        }
        res.status(200).json({ data: warehouse });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouses = yield WarehouseEmployee_1.default.find();
        res.status(200).json({ data: warehouses });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, cnic, phoneNumber, role, password, warehouseId } = req.body;
        const updatedWarehouseEmployee = yield WarehouseEmployee_1.default.updateOne({ _id }, {
            name: name,
            cnic: cnic,
            phoneNumber: phoneNumber,
            role: role,
            password: password,
            warehouseId: warehouseId,
        });
        if (!updatedWarehouseEmployee)
            throw new Error("WarehouseEmployee not found!");
        res.status(201).json({ data: updatedWarehouseEmployee });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const deleteWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.warehouseId;
        const warehouse = yield WarehouseEmployee_1.default.deleteOne({ _id });
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
    createWarehouseEmployee,
    readAllWarehouseEmployee,
    readWarehouseEmployee,
    updateWarehouseEmployee,
    deleteWarehouseEmployee,
};
