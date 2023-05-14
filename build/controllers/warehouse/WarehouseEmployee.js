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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt = require("bcrypt");
const createWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cnic, email, phoneNumber, role, password, warehouseId } = req.body;
    try {
        const salt = yield bcrypt.genSalt();
        const hashedPassword = yield bcrypt.hash(password, salt);
        const warehouse = yield WarehouseEmployee_1.default.create({
            name,
            cnic,
            email,
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
        const warehouseId = req.params.warehouseEmployeeId;
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
const readEmployeesOfWarehouse = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const warehouseId = req.params.warehouseId;
        const warehouses = yield WarehouseEmployee_1.default.find({ warehouseId });
        if (!warehouses)
            throw new Error("Warehouse Not Found");
        res.status(200).json({ data: warehouses });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const loginEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    console.log(req.body);
    try {
        // check if email is in the database
        const warehouseEmployee = (yield WarehouseEmployee_1.default.findOne({
            email,
        }));
        if (!warehouseEmployee) {
            throw new Error("Email not found!");
        }
        if (yield bcrypt.compare(password, warehouseEmployee.password)) {
            const data = {
                _id: warehouseEmployee._id,
                name: warehouseEmployee.name,
                phoneNumber: warehouseEmployee.phoneNumber,
                cnic: warehouseEmployee.cnic,
                email: warehouseEmployee.email,
                role: warehouseEmployee.role,
                warehouseId: warehouseEmployee.warehouseId,
            };
            // const token = jwt.sign({ data }, process.env.SECRET_KEY as Secret, {
            //   expiresIn: "20s",
            // });
            const token = jsonwebtoken_1.default.sign({ data }, process.env.SECRET_KEY);
            res.status(200).json({
                data,
                token,
            });
        }
        else
            throw new Error("Password is incorrect!");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// TODO: Add Update Password route
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
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteWarehouseEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.warehouseEmployeeId;
        const warehouse = yield WarehouseEmployee_1.default.deleteOne({ _id });
        if (warehouse.acknowledged && warehouse.deletedCount == 0)
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
    readEmployeesOfWarehouse,
    loginEmployee,
    updateWarehouseEmployee,
    deleteWarehouseEmployee,
};
