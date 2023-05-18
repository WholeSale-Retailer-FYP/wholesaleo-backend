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
const mongoose_1 = __importDefault(require("mongoose"));
const RetailerInventory_1 = __importDefault(require("../../models/retailer/RetailerInventory"));
const RetailerPOS_1 = __importDefault(require("../../models/retailer/RetailerPOS"));
const RetailerSaleData_1 = __importDefault(require("../../models/retailer/RetailerSaleData"));
const createRetailerPOS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { items, retailerId, retailerEmployeeId } = req.body;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction(); //--------------------
        const retailerPOSId = new mongoose_1.default.Types.ObjectId();
        yield RetailerPOS_1.default.create({
            _id: retailerPOSId,
            retailerEmployeeId,
        });
        const retailerSaleData = yield RetailerSaleData_1.default.insertMany(items.map((item) => ({
            retailerInventoryId: item.retailerInventoryId,
            quantity: item.quantity,
            retailerPOSId: retailerPOSId,
        })));
        yield RetailerInventory_1.default.bulkWrite(items.map((item) => ({
            updateOne: {
                filter: {
                    retailerId,
                    warehouseInventoryId: item.warehouseInventoryId,
                },
                update: { $inc: { quantity: -item.quantity } },
            },
        })));
        yield session.commitTransaction(); //--------------------
        session.endSession();
        res.status(201).json({ data: retailerSaleData });
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerPOS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerPOSId = req.params.retailerPOSId;
        const retailerPOS = yield RetailerPOS_1.default.findById(retailerPOSId).populate({
            path: "retailerEmployeeId",
            select: ["firstName", "lastName", "role"],
        });
        if (!retailerPOS) {
            throw new Error("RetailerPOS Not Found");
        }
        res.status(200).json({ data: retailerPOS });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerPOS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const retailerPOSs = yield RetailerPOS_1.default.find().populate({
            path: "retailerEmployeeId",
            select: ["firstName", "lastName", "role"],
        });
        res.status(200).json({ data: retailerPOSs });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRetailerPOS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, retailerEmployeeId } = req.body;
        const updatedRetailerPOS = yield RetailerPOS_1.default.updateOne({ _id }, { retailerEmployeeId: retailerEmployeeId });
        if (!updatedRetailerPOS)
            throw new Error("RetailerPOS not found!");
        res.status(201).json({ data: updatedRetailerPOS });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerPOS = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.retailerPOSId;
        const retailerPOS = yield RetailerPOS_1.default.deleteOne({ _id });
        if (!retailerPOS)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerPOS,
    readAllRetailerPOS,
    readRetailerPOS,
    updateRetailerPOS,
    deleteRetailerPOS,
};
