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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ItemCategory_1 = __importDefault(require("../controllers/ItemCategory"));
const cloudinaryConfig_1 = require("../config/cloudinaryConfig");
const multerUploads = __importStar(require("../middleware/multer"));
const router = express_1.default.Router();
router.post("/create", cloudinaryConfig_1.cloudinaryConfig, multerUploads.multerUploads, ItemCategory_1.default.createItemCategory);
router.post("/createFromUrl", ItemCategory_1.default.createItemCategoryFromUrl);
router.get("/get/:itemCategoryId", ItemCategory_1.default.readItemCategory);
router.get("/get/", ItemCategory_1.default.readAllItemCategory);
router.get("/get/defaultAndCustom/:retailerId", ItemCategory_1.default.readDefaultAndCustomCategories);
router.put("/update/", ItemCategory_1.default.updateItemCategory);
router.delete("/delete/:itemCategoryId", ItemCategory_1.default.deleteItemCategory);
module.exports = router;
