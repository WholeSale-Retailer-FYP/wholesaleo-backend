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
const RetailerEmployee_1 = __importDefault(require("../../models/retailer/RetailerEmployee"));
const bcrypt = require("bcrypt");
const createRetailerEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, cnic, phoneNumber, role, password, retailerId } = req.body;
    try {
        const salt = yield bcrypt.genSalt();
        const hashedPassword = yield bcrypt.hash(password, salt);
        const retailerEmployee = yield RetailerEmployee_1.default.create({
            firstName,
            lastName,
            cnic,
            phoneNumber,
            role,
            password: hashedPassword,
            retailerId,
        });
        res.status(201).json({ data: retailerEmployee });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerEmployeeId = req.params.retailerEmployeeId;
        const retailer = yield RetailerEmployee_1.default.findById(retailerEmployeeId).populate("retailerId", "shopName");
        if (!retailer) {
            res.status(404).json({ message: "Retailer not Found" });
            return;
        }
        res.status(200).json({ data: retailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailer = yield RetailerEmployee_1.default.find().populate("retailerId", "shopName");
        res.status(200).json({ data: retailer });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const loginRetailerEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cnic, password } = req.body;
        const retailerEmployee = yield RetailerEmployee_1.default.findOne({ cnic }).populate("retailerId", "shopName");
        if (!retailerEmployee)
            throw new Error("Retailer not found! Incorrect CNIC");
        if (yield bcrypt.compare(password, retailerEmployee.password)) {
            const { _id } = retailerEmployee;
            res.json({
                data: {
                    _id: retailerEmployee._id,
                    firstName: retailerEmployee.firstName,
                    lastName: retailerEmployee.lastName,
                    phoneNumber: retailerEmployee.phoneNumber,
                    role: retailerEmployee.role,
                    retailerId: retailerEmployee.retailerId,
                },
            });
        }
        else
            throw new Error("Incorrect Password entered");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, firstName, lastName, cnic, phoneNumber, role, password, retailerId, } = req.body;
        const updatedRetailerEmployee = yield RetailerEmployee_1.default.updateOne({ _id }, {
            firstName: firstName,
            lastName: lastName,
            cnic: cnic,
            phoneNumber: phoneNumber,
            role: role,
            password: password,
            retailerId: retailerId,
        });
        if (!updatedRetailerEmployee)
            throw new Error("RetailerEmployee not found!");
        res.status(201).json({ data: updatedRetailerEmployee });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerEmployeeId;
        const warehouse = yield RetailerEmployee_1.default.deleteOne({ _id });
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
    createRetailerEmployee,
    readAllRetailerEmployee,
    readRetailerEmployee,
    loginRetailerEmployee,
    updateRetailerEmployee,
    deleteRetailerEmployee,
};
