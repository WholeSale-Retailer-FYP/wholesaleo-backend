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
const ItemCategory_1 = __importDefault(require("../models/ItemCategory"));
const cloudinary_1 = require("cloudinary");
const CustomCategory_1 = __importDefault(require("../models/retailer/CustomCategory"));
const createItemCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        if (!req.file)
            res.status(500).json({ message: "No file present" });
        let uploadedFile;
        uploadedFile = yield cloudinary_1.v2.uploader.upload(req.file.path, {
            folder: "items",
            resource_type: "auto",
            width: 350,
            height: 350,
        });
        const itemCategory = yield ItemCategory_1.default.create({
            name,
            image: uploadedFile.secure_url,
        });
        res.status(201).json({ data: itemCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const createItemCategoryFromUrl = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image } = req.body;
    try {
        const itemCategory = yield ItemCategory_1.default.create({
            name,
            image,
        });
        res.status(201).json({ data: itemCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readItemCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemCategoryId = req.params.itemCategoryId;
        const itemCategory = yield ItemCategory_1.default.findById(itemCategoryId);
        if (!itemCategory) {
            throw new Error("ItemCategory Not Found");
        }
        res.status(200).json({ data: itemCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllItemCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemCategorys = yield ItemCategory_1.default.find();
        res.status(200).json({ data: itemCategorys });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readDefaultAndCustomCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { retailerId } = req.params;
        var itemCategorys = yield ItemCategory_1.default.find();
        if (!itemCategorys)
            throw new Error("ItemCategory not found!");
        const customCategoryOfRetailer = yield CustomCategory_1.default.find({
            retailerId,
        });
        if (!customCategoryOfRetailer)
            throw new Error("Custom Category of Retailer not found!");
        let allCategories = itemCategorys.map((itemCategory) => {
            return Object.assign(Object.assign({}, itemCategory._doc), { custom: false });
        });
        let customCategories = customCategoryOfRetailer.map((customCategory) => {
            return Object.assign(Object.assign({}, customCategory._doc), { custom: true });
        });
        allCategories.push(...customCategories);
        res.status(200).json({ data: allCategories });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// todo: Handle image update. Delete previous image in Cloudinary andn then add new image to Cloudinary
const updateItemCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name } = req.body;
        const updatedItemCategory = yield ItemCategory_1.default.updateOne({ _id }, { name: name });
        if (!updatedItemCategory)
            throw new Error("ItemCategory not found!");
        res.status(201).json({ data: updatedItemCategory });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteItemCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.itemCategoryId;
        const itemCategory = yield ItemCategory_1.default.deleteOne({ _id });
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
    createItemCategory,
    readAllItemCategory,
    createItemCategoryFromUrl,
    readItemCategory,
    readDefaultAndCustomCategories,
    updateItemCategory,
    deleteItemCategory,
};
