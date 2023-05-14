"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const CustomItem_1 = __importDefault(require("../../controllers/retailer/CustomItem"));
const router = express_1.default.Router();
router.post("/create", CustomItem_1.default.createCustomItem);
router.get("/get/", CustomItem_1.default.getAllCustomItem);
router.get("/get/:customItemId", CustomItem_1.default.getCustomItemById);
router.get("/get/retailer/:retailerId", CustomItem_1.default.getCustomItemOfRetailer);
router.put("/update/", CustomItem_1.default.updateCustomItemById);
router.delete("/delete/:customItemId", CustomItem_1.default.deleteCustomItemById);
module.exports = router;
