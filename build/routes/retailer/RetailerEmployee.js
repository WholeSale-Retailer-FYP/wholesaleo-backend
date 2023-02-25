"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerEmployee_1 = __importDefault(require("../../controllers/retailer/RetailerEmployee"));
const router = express_1.default.Router();
router.post("/create", RetailerEmployee_1.default.createRetailerEmployee);
router.get("/get/:retailerEmployeeId", RetailerEmployee_1.default.readRetailerEmployee);
router.get("/get/", RetailerEmployee_1.default.readAllRetailerEmployee);
router.post("/login/", RetailerEmployee_1.default.loginRetailerEmployee);
router.put("/update/", RetailerEmployee_1.default.updateRetailerEmployee);
router.delete("/delete/:retailerEmployeeId", RetailerEmployee_1.default.deleteRetailerEmployee);
module.exports = router;
