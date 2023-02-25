"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerInventory_1 = __importDefault(require("../../controllers/retailer/RetailerInventory"));
const router = express_1.default.Router();
router.post("/create", RetailerInventory_1.default.createRetailerInventory);
router.get("/get/:retailerInventoryId", RetailerInventory_1.default.readRetailerInventory);
router.get("/get/retailer/:retailerId", RetailerInventory_1.default.readRetailerInventoryOfRetailer);
router.get("/get/", RetailerInventory_1.default.readAllRetailerInventory);
router.put("/update/", RetailerInventory_1.default.updateRetailerInventory);
router.delete("/delete/:retailerInventoryId", RetailerInventory_1.default.deleteRetailerInventory);
module.exports = router;
