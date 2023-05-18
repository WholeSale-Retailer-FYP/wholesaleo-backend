"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const CustomCategory_1 = __importDefault(require("../../controllers/retailer/CustomCategory"));
const router = express_1.default.Router();
router.post("/create", CustomCategory_1.default.createCustomCategory);
router.get("/get/", CustomCategory_1.default.getAllCustomCategories);
router.get("/get/:customCategoryId", CustomCategory_1.default.getCustomCategoryById);
router.get("/get/retailer/:retailerId", CustomCategory_1.default.getCustomerCategoryOfRetailer);
router.put("/update/", CustomCategory_1.default.updateCustomCategoryById);
router.delete("/delete/:customCategoryId", CustomCategory_1.default.deleteCustomCategoryById);
module.exports = router;
