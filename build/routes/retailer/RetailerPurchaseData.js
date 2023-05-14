"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerPurchaseData_1 = __importDefault(require("../../controllers/retailer/RetailerPurchaseData"));
const router = express_1.default.Router();
router.post("/create", RetailerPurchaseData_1.default.createRetailerPurchaseData);
router.get("/get/", RetailerPurchaseData_1.default.readAllRetailerPurchaseData);
router.get("/get/:retailerPurchaseDataId", RetailerPurchaseData_1.default.readRetailerPurchaseData);
router.get("/get/purchase/:retailerPurchaseId", RetailerPurchaseData_1.default.readDataOfPurchase);
router.put("/update/", RetailerPurchaseData_1.default.updateRetailerPurchaseData);
router.delete("/delete/:retailerPurchaseDataId", RetailerPurchaseData_1.default.deleteRetailerPurchaseData);
module.exports = router;
