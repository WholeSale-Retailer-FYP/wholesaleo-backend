"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerEmployee_1 = __importDefault(require("../../controllers/retailer/RetailerEmployee"));
const cloudinaryConfig_1 = require("../../config/cloudinaryConfig");
const multerUploads = __importStar(require("../../middleware/multer"));
const router = express_1.default.Router();
router.post("/create", RetailerEmployee_1.default.createRetailerEmployee);
router.get("/get/", RetailerEmployee_1.default.readAllRetailerEmployee);
router.get("/get/:retailerEmployeeId", RetailerEmployee_1.default.readRetailerEmployee);
router.get("/get/retailer/:retailerId", RetailerEmployee_1.default.readEmployeesOfSingleRetailer);
router.post("/login/", RetailerEmployee_1.default.loginRetailerEmployee);
router.put("/update/", RetailerEmployee_1.default.updateRetailerEmployee);
router.put("/update/password", RetailerEmployee_1.default.updatePassword);
router.put("/update/image", cloudinaryConfig_1.cloudinaryConfig, multerUploads.multerUploads, RetailerEmployee_1.default.updateImage);
router.delete("/delete/:retailerEmployeeId", RetailerEmployee_1.default.deleteRetailerEmployee);
module.exports = router;
