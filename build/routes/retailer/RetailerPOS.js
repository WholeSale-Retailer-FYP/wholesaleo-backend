"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerPOS_1 = __importDefault(require("../../controllers/retailer/RetailerPOS"));
const router = express_1.default.Router();
router.post("/create", RetailerPOS_1.default.createRetailerPOS);
router.get("/get/:retailerPOSId", RetailerPOS_1.default.readRetailerPOS);
router.get("/get/", RetailerPOS_1.default.readAllRetailerPOS);
router.put("/update/", RetailerPOS_1.default.updateRetailerPOS);
router.delete("/delete/:retailerPOSId", RetailerPOS_1.default.deleteRetailerPOS);
module.exports = router;
