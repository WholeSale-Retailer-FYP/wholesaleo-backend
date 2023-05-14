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
const AdminEmployee_1 = __importDefault(require("../../models/admin/AdminEmployee"));
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, role, cnic, provinceId, cityId, regionId } = req.body;
    try {
        const adminEmployee = yield AdminEmployee_1.default.create({
            name,
            email,
            password,
            role,
            cnic,
            provinceId,
            cityId,
            regionId,
        });
        res.status(201).json({ data: adminEmployee });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const read = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const adminEmployeeId = req.params.adminEmployeeId;
        const adminEmployee = yield AdminEmployee_1.default.findById(adminEmployeeId);
        if (adminEmployee) {
            res.status(200).json({ data: adminEmployee });
        }
        throw new Error("AdminEmployee Not Found");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employees = yield AdminEmployee_1.default.find();
        res.status(200).json({ data: employees });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, email, password, role, cnic, provinceId, cityId, regionId, } = req.body;
        const updated = yield AdminEmployee_1.default.updateOne({ _id }, { name, email, password, role, cnic, provinceId, cityId, regionId });
        if (!updated)
            throw new Error("AdminEmployee not found!");
        res.status(201).json({ data: updated });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteAdminEmployee = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.adminEmployeeId;
        const employee = yield AdminEmployee_1.default.deleteOne({ _id });
        if (employee.acknowledged && employee.deletedCount == 0)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    create,
    readAll,
    read,
    update,
    deleteAdminEmployee,
};
