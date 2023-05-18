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
const cloudinary_1 = require("cloudinary");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const RetailerEmployee_1 = __importDefault(require("../../models/retailer/RetailerEmployee"));
const bcrypt = require("bcrypt");
const DEFAULT_IMG = "https://res.cloudinary.com/dca8sskac/image/upload/v1679653632/defaultProfile_ae3kr1.png";
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
            image: DEFAULT_IMG,
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
const readEmployeesOfSingleRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerId = req.params.retailerId;
        const retailer = yield RetailerEmployee_1.default.find({ retailerId }).populate("retailerId", "shopName");
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
        const retailerEmployee = yield RetailerEmployee_1.default.findOne({ cnic }).populate({
            path: "retailerId",
            select: ["shopName", "warehouseId"],
        });
        if (!retailerEmployee)
            throw new Error("Retailer not found! Incorrect CNIC");
        if (yield bcrypt.compare(password, retailerEmployee.password)) {
            const data = {
                _id: retailerEmployee._id,
                firstName: retailerEmployee.firstName,
                lastName: retailerEmployee.lastName,
                phoneNumber: retailerEmployee.phoneNumber,
                role: retailerEmployee.role,
                retailerId: retailerEmployee.retailerId,
            };
            // const token = jwt.sign({ data }, process.env.SECRET_KEY as Secret, {
            //   expiresIn: "20s",
            // });
            const token = jsonwebtoken_1.default.sign({ data }, process.env.SECRET_KEY);
            res.json({
                data,
                token,
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
        const { _id, firstName, lastName, cnic, phoneNumber, role, retailerId } = req.body;
        // check if retailer exists
        const retailerEmployee = yield RetailerEmployee_1.default.findById(_id);
        if (!retailerEmployee)
            throw new Error("RetailerEmployee not found!");
        const updatedRetailerEmployee = yield RetailerEmployee_1.default.updateOne({ _id }, {
            firstName: firstName,
            lastName: lastName,
            cnic: cnic,
            phoneNumber: phoneNumber,
            role: role,
            retailerId: retailerId,
        });
        if (!updatedRetailerEmployee)
            throw new Error("ERROR: Could not update retailer Info!");
        res.status(201).json({ data: updatedRetailerEmployee });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, newPassword, oldPassword } = req.body;
        // check if retailer exists
        const retailerEmployee = yield RetailerEmployee_1.default.findById(_id);
        if (!retailerEmployee)
            throw new Error("RetailerEmployee not found!");
        //check if old password is correct
        if (yield bcrypt.compare(oldPassword, retailerEmployee.password)) {
            const salt = yield bcrypt.genSalt();
            const hashedPassword = yield bcrypt.hash(newPassword, salt);
            const updatedRetailerEmployee = yield RetailerEmployee_1.default.updateOne({ _id }, {
                password: hashedPassword,
            });
            if (!updatedRetailerEmployee)
                throw new Error("ERROR: Could not update retailer Info!");
            res.status(201).json({ data: updatedRetailerEmployee });
        }
        else
            throw new Error("Incorrect Password entered");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { _id } = req.body;
        const retailerEmployee = yield RetailerEmployee_1.default.findById(_id);
        if (!retailerEmployee)
            throw new Error("RetailerEmployee not found!");
        if (!req.file)
            res.status(500).json({ message: "No image uploaded!" });
        let uploadedFile;
        uploadedFile = yield cloudinary_1.v2.uploader.upload(req.file.path, {
            resource_type: "auto",
            width: 350,
            height: 350,
        });
        // update image field in retailerExployees
        const updatedRetailerEmployee = yield RetailerEmployee_1.default.updateOne({ _id }, {
            image: uploadedFile.secure_url,
        });
        if (!updatedRetailerEmployee)
            throw new Error("Could not update image!");
        // delete previous image from cloudinary if exists and if it is not default image
        if (retailerEmployee.image && retailerEmployee.image !== DEFAULT_IMG) {
            const publicId = (_a = retailerEmployee.image.split("/").pop()) === null || _a === void 0 ? void 0 : _a.split(".")[0];
            if (publicId)
                yield cloudinary_1.v2.uploader.destroy(publicId);
        }
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
    readEmployeesOfSingleRetailer,
    loginRetailerEmployee,
    updateRetailerEmployee,
    updatePassword,
    updateImage,
    deleteRetailerEmployee,
};
