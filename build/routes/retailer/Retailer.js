"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Retailer_1 = __importDefault(require("../../controllers/retailer/Retailer"));
const router = express_1.default.Router();
router.post("/create", Retailer_1.default.createRetailer);
router.get("/get/:retailerId", Retailer_1.default.readRetailer);
router.get("/get/", Retailer_1.default.readAllRetailer);
router.put("/update/verify", Retailer_1.default.verifyRetailer);
router.put("/update/", Retailer_1.default.updateRetailer);
router.delete("/delete/:retailerId", Retailer_1.default.deleteRetailer);
module.exports = router;
