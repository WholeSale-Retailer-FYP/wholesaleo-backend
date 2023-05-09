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
const Item_1 = __importDefault(require("../models/Item"));
const cloudinary_1 = require("cloudinary");
const createItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, itemCategoryId } = req.body;
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
        const item = yield Item_1.default.create({
            name,
            itemCategoryId,
            image: uploadedFile.secure_url,
        });
        res.status(201).json({ data: item });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemId = req.params.itemId;
        const item = yield Item_1.default.findById(itemId).populate("itemCategoryId", "name");
        if (!item) {
            throw new Error("Item Not Found");
        }
        res.status(200).json({ data: item });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readItemOfCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemCategoryId = req.params.itemCategoryId;
        const item = yield Item_1.default.find({ itemCategoryId }).populate("itemCategoryId", "name");
        if (!item) {
            throw new Error("Item Not Found");
        }
        res.status(200).json({ data: item });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const items = yield Item_1.default.find().populate("itemCategoryId", "name");
        res.status(200).json({ data: items });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
// todo: Handle image update. Delete previous image in Cloudinary andn test if edited image displaying properly
const updateItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { _id, name, itemCategoryId } = req.body;
        const updatedItem = yield Item_1.default.updateOne({ _id }, {
            name: name,
            itemCategoryId: itemCategoryId,
            image: uploadedFile.secure_url,
        });
        if (!updatedItem)
            throw new Error("Item not found!");
        res.status(201).json({ data: updatedItem });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.itemId;
        const item = yield Item_1.default.deleteOne({ _id });
        if (!item)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createItem,
    readAllItem,
    readItemOfCategory,
    readItem,
    updateItem,
    deleteItem,
};
