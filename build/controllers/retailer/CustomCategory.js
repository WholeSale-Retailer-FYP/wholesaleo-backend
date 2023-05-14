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
const CustomCategory_1 = __importDefault(require("../../models/retailer/CustomCategory"));
const createCustomCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, retailerId, image } = req.body;
    try {
        const customCategory = yield CustomCategory_1.default.create({
            name,
            retailerId,
            image,
        });
        if (!customCategory)
            throw new Error("Custom Category not created!");
        res.status(201).json({ data: customCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const getAllCustomCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customCategories = yield CustomCategory_1.default.find();
        if (!customCategories)
            throw new Error("Custom Category not found!");
        res.status(200).json({ data: customCategories });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const getCustomerCategoryOfRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { retailerId } = req.params;
    try {
        const customCategories = yield CustomCategory_1.default.find({
            retailerId,
        });
        if (!customCategories)
            throw new Error("Custom Category not found!");
        res.status(200).json({ data: customCategories });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const getCustomCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customCategoryId } = req.params;
    try {
        const customCategory = yield CustomCategory_1.default.findById(customCategoryId);
        if (!customCategory)
            throw new Error("Custom Category not found!");
        res.status(200).json({ data: customCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateCustomCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, retailerId, image } = req.body;
    try {
        const customCategory = yield CustomCategory_1.default.findByIdAndUpdate(_id, {
            name,
            retailerId,
            image,
        });
        if (!customCategory)
            throw new Error("Custom Category not found!");
        res.status(200).json({ data: customCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteCustomCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customCategoryId } = req.params;
    try {
        const customCategory = yield CustomCategory_1.default.findByIdAndDelete(customCategoryId);
        res.status(200).json({ data: "Custom Category Deleted!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createCustomCategory,
    getAllCustomCategories,
    getCustomerCategoryOfRetailer,
    getCustomCategoryById,
    updateCustomCategoryById,
    deleteCustomCategoryById,
};
