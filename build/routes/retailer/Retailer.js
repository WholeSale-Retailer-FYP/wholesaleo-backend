"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Retailer_1 = __importDefault(require("../../controllers/retailer/Retailer"));
const router = express_1.default.Router();
router.post("/createShop", Retailer_1.default.createRetailer);
router.post("/create", Retailer_1.default.createRetailerAndAdmin);
router.get("/get/", Retailer_1.default.readAllRetailer);
router.get("/get/unverified", Retailer_1.default.readUnverifiedRetailers);
router.get("/get/:retailerId", 
// auth([Roles.Manager, Roles.Employee]),
Retailer_1.default.readRetailer);
router.put("/update/verify", Retailer_1.default.verifyRetailer);
router.put("/update/", Retailer_1.default.updateRetailer);
router.delete("/delete/:retailerId", Retailer_1.default.deleteRetailer);
router.get("/analytics/:retailerId", Retailer_1.default.dashboardAnalytics);
module.exports = router;
