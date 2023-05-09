"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerSaleData_1 = __importDefault(require("../../controllers/retailer/RetailerSaleData"));
const router = express_1.default.Router();
router.post("/create", RetailerSaleData_1.default.createRetailerSaleData);
router.get("/get/:retailerSaleDataId", RetailerSaleData_1.default.readRetailerSaleData);
router.get("/get/", RetailerSaleData_1.default.readAllRetailerSaleData);
router.put("/update/", RetailerSaleData_1.default.updateRetailerSaleData);
router.delete("/delete/:retailerSaleDataId", RetailerSaleData_1.default.deleteRetailerSaleData);
module.exports = router;
