"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importDefault(require("mongoose"));
const Retailer_1 = __importDefault(require("../../models/retailer/Retailer"));
const RetailerEmployee_1 = __importStar(require("../../models/retailer/RetailerEmployee"));
const RetailerPurchase_1 = __importDefault(require("../../models/retailer/RetailerPurchase"));
const RetailerSaleData_1 = __importDefault(require("../../models/retailer/RetailerSaleData"));
const bcrypt = require("bcrypt");
const createRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopName, postalCode, latitude, longitude, address, regionId, warehouseId, amountPayable, shopSize, } = req.body;
    try {
        const retailer = yield Retailer_1.default.create({
            shopName,
            postalCode,
            latitude,
            longitude,
            address,
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
const createRetailerAndAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { shopName, postalCode, latitude, longitude, address, regionId, warehouseId, shopSize, firstName, lastName, cnic, password, phoneNumber, } = req.body;
    const session = yield Retailer_1.default.startSession();
    try {
        session.startTransaction();
        const retailerId = new mongoose_1.default.Types.ObjectId();
        const retailer = yield Retailer_1.default.create([
            {
                _id: retailerId,
                shopName,
                postalCode,
                latitude,
                longitude,
                address,
                regionId,
                warehouseId,
                shopSize,
            },
        ], { session });
        if (retailer) {
            const salt = yield bcrypt.genSalt();
            const hashedPassword = yield bcrypt.hash(password, salt);
            const retailerAdmin = yield RetailerEmployee_1.default.create([
                {
                    firstName,
                    lastName,
                    cnic,
                    phoneNumber,
                    role: RetailerEmployee_1.Roles.Owner,
                    password: hashedPassword,
                    retailerId,
                },
            ], { session });
            if (!retailerAdmin) {
                throw new Error("Retailer Admin not created!");
            }
            yield session.commitTransaction();
            res.status(201).json({ data: retailer });
            session.endSession();
        }
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
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
// read unverified retailers
const readUnverifiedRetailers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailers = yield Retailer_1.default.find({ verified: false }).populate([
            "regionId",
        ]);
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
        const { _id, shopName, postalCode, latitude, address, longitude, regionId, warehouseId, amountPayable, shopSize, } = req.body;
        const updatedRetailer = yield Retailer_1.default.updateOne({ _id }, {
            shopName,
            postalCode,
            latitude,
            address,
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
const dashboardAnalytics = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerId = req.params.retailerId;
        let analytics = {
            accountPayable: 0,
            totalOrders: 0,
            totalSalesCount: 0,
            totalSalesAmount: 0,
            totalEmployees: 0,
        };
        const retailer = yield Retailer_1.default.findById(retailerId);
        if (!retailer)
            throw new Error("Retailer Not Found");
        analytics.accountPayable = retailer.amountPayable;
        // get sales of retailer
        const retailerSales = yield RetailerSaleData_1.default.find({ retailerId }).populate("retailerInventoryId");
        if (retailerSales) {
            analytics.totalSalesCount = retailerSales.length;
            // TODO: get retailer sales amount
            // const copy = retailerSales as any;
            // analytics.totalSalesAmount = copy.reduce(
            //   (acc: any, curr: any) => acc + curr.retailerInventoryId.sellingPrice,
            //   0
            // );
        }
        // get employees of retailer
        const employees = yield RetailerEmployee_1.default.find({ retailerId });
        if (RetailerEmployee_1.default)
            analytics.totalEmployees = employees.length;
        // get orders of retailer
        const retailerPurchase = yield RetailerPurchase_1.default.find({ retailerId });
        if (retailerPurchase)
            analytics.totalOrders = retailerPurchase.length;
        res.status(200).json({ data: analytics });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailer,
    createRetailerAndAdmin,
    readAllRetailer,
    readRetailer,
    readUnverifiedRetailers,
    verifyRetailer,
    updateRetailer,
    deleteRetailer,
    dashboardAnalytics,
};
