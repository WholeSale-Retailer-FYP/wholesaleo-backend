"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerPurchase_1 = __importDefault(require("../../controllers/retailer/RetailerPurchase"));
const router = express_1.default.Router();
router.post("/create", RetailerPurchase_1.default.createRetailerPurchase);
router.get("/get/:retailerPurchaseId", RetailerPurchase_1.default.readRetailerPurchase);
router.get("/get/retailer/:retailerId", RetailerPurchase_1.default.readPurchasesOfSingleRetailer);
router.get("/get/", RetailerPurchase_1.default.readAllRetailerPurchase);
router.put("/update/", RetailerPurchase_1.default.updateRetailerPurchase);
router.delete("/delete/:retailerPurchaseId", RetailerPurchase_1.default.deleteRetailerPurchase);
module.exports = router;
