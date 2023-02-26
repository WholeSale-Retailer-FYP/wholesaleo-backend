"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerCategory_1 = __importDefault(require("../controllers/RetailerCategory"));
const router = express_1.default.Router();
router.post("/create", RetailerCategory_1.default.createRetailerCategory);
router.get("/get/:retailerCategoryId", RetailerCategory_1.default.readRetailerCategory);
router.get("/get/", RetailerCategory_1.default.readAllRetailerCategory);
router.put("/update/", RetailerCategory_1.default.updateRetailerCategory);
router.delete("/delete/:retailerCategoryId", RetailerCategory_1.default.deleteRetailerCategory);
module.exports = router;
