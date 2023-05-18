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
const ItemType_1 = __importDefault(require("../models/ItemType"));
const createItemType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, quantity } = req.body;
    try {
        const itemType = yield ItemType_1.default.create({ name, quantity });
        res.status(201).json({ data: itemType });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readItemType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemTypeId = req.params.itemTypeId;
        const itemType = yield ItemType_1.default.findById(itemTypeId);
        if (!itemType) {
            throw new Error("ItemType Not Found");
        }
        res.status(200).json({ data: itemType });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllItemType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const itemTypes = yield ItemType_1.default.find();
        res.status(200).json({ data: itemTypes });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateItemType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, quantity } = req.body;
        const updatedItemType = yield ItemType_1.default.updateOne({ _id }, { name, quantity });
        if (!updatedItemType)
            throw new Error("ItemType not found!");
        res.status(201).json({ data: updatedItemType });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteItemType = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.itemTypeId;
        const itemType = yield ItemType_1.default.deleteOne({ _id });
        if (!itemType)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createItemType,
    readAllItemType,
    readItemType,
    updateItemType,
    deleteItemType,
};
