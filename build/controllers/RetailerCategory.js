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
const RetailerCategory_1 = __importDefault(require("../models/RetailerCategory"));
const createRetailerCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const itemCategory = yield RetailerCategory_1.default.create({
            name,
        });
        res.status(201).json({ data: itemCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRetailerCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemCategoryId = req.params.itemCategoryId;
        const itemCategory = yield RetailerCategory_1.default.findById(itemCategoryId);
        if (!itemCategory) {
            throw new Error("RetailerCategory Not Found");
        }
        res.status(200).json({ data: itemCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRetailerCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemCategorys = yield RetailerCategory_1.default.find();
        res.status(200).json({ data: itemCategorys });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// todo: Handle image update. Delete previous image in Cloudinary andn then add new image to Cloudinary
const updateRetailerCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name } = req.body;
        const updatedRetailerCategory = yield RetailerCategory_1.default.updateOne({ _id }, { name: name });
        if (!updatedRetailerCategory)
            throw new Error("RetailerCategory not found!");
        res.status(201).json({ data: updatedRetailerCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRetailerCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.itemCategoryId;
        const itemCategory = yield RetailerCategory_1.default.deleteOne({ _id });
        if (!itemCategory)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRetailerCategory,
    readAllRetailerCategory,
    readRetailerCategory,
    updateRetailerCategory,
    deleteRetailerCategory,
};
