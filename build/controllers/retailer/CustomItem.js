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
exports.convertCustomItemToDefaultItem = void 0;
const CustomItem_1 = __importDefault(require("../../models/retailer/CustomItem"));
const createCustomItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, weight, description, sellingPrice, originalPrice, quantity, retailerId, customCategoryId, } = req.body;
    try {
        const customItem = yield CustomItem_1.default.create({
            name,
            image,
            weight,
            description,
            sellingPrice,
            originalPrice,
            quantity,
            retailerId,
            customCategoryId,
        });
        if (!customItem)
            throw new Error("Custom Category not created!");
        res.status(201).json({ data: customItem });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const getAllCustomItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customItems = yield CustomItem_1.default.find().populate([
            {
                path: "customCategoryId",
                select: "name",
            },
            {
                path: "retailerId",
                select: "shopName",
            },
        ]);
        if (!customItems)
            throw new Error("Custom Category not found!");
        const copy = convertCustomItemToDefaultItem(customItems);
        res.status(200).json({ data: copy });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const getCustomItemOfRetailer = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { retailerId } = req.params;
    try {
        const customCategories = yield CustomItem_1.default.find({
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
const getCustomItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customItemId } = req.params;
    try {
        const customItem = yield CustomItem_1.default.findById(customItemId);
        if (!customItem)
            throw new Error("Custom Category not found!");
        res.status(200).json({ data: customItem });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateCustomItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, name, image, weight, description, sellingPrice, originalPrice, quantity, retailerId, customCategoryId, } = req.body;
    try {
        const customItem = yield CustomItem_1.default.findByIdAndUpdate(_id, {
            name,
            image,
            weight,
            description,
            sellingPrice,
            originalPrice,
            quantity,
            retailerId,
            customCategoryId,
        });
        if (!customItem)
            throw new Error("Custom Category not found!");
        res.status(200).json({ data: customItem });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteCustomItemById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { customItemId } = req.params;
    try {
        const customItem = yield CustomItem_1.default.findByIdAndDelete(customItemId);
        res.status(200).json({ data: "Custom Category Deleted!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
function convertCustomItemToDefaultItem(items) {
    return items.map((item) => {
        const { _id, name, image, weight, sellingPrice, quantity, retailerId, originalPrice, description, customCategoryId, } = item;
        let warehouseInventoryId = {};
        const customCategoryName = customCategoryId;
        warehouseInventoryId._id = "x";
        warehouseInventoryId.weight = weight;
        warehouseInventoryId.itemId = {
            _id,
            name,
            image,
            description,
            itemCategoryId: {
                _id: customCategoryId == null ? "x" : customCategoryName._id,
                name: customCategoryName == null ? "x" : customCategoryName.name,
            },
        };
        // if (customCategoryId == null) {
        //   console.log("here");
        //   warehouseInventoryId.itemId.categoryId._id = "x";
        //   warehouseInventoryId.itemId.categoryId.name = "X";
        // } else {
        //   warehouseInventoryId.itemId.categoryId._id = customCategoryId._id;
        //   warehouseInventoryId.itemId.categoryId.name = customCategoryName.name;
        // }
        return {
            _id,
            custom: true,
            retailerId,
            warehouseInventoryId,
            quantity,
            sellingPrice,
            originalPrice,
        };
    });
}
exports.convertCustomItemToDefaultItem = convertCustomItemToDefaultItem;
exports.default = {
    createCustomItem,
    getAllCustomItem,
    getCustomItemOfRetailer,
    getCustomItemById,
    updateCustomItemById,
    deleteCustomItemById,
};
