"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const ItemType_1 = __importDefault(require("../controllers/ItemType"));
const router = express_1.default.Router();
router.post("/create", ItemType_1.default.createItemType);
router.get("/get/:itemTypeId", ItemType_1.default.readItemType);
router.get("/get/", ItemType_1.default.readAllItemType);
router.put("/update/", ItemType_1.default.updateItemType);
router.delete("/delete/:itemTypeId", ItemType_1.default.deleteItemType);
module.exports = router;
