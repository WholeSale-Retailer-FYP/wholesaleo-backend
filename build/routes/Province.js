"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Province_1 = __importDefault(require("../controllers/Province"));
const router = express_1.default.Router();
router.post("/create", Province_1.default.createProvince);
router.get("/get/:provinceId", Province_1.default.readProvince);
router.get("/get/", Province_1.default.readAllProvince);
router.put("/update/", Province_1.default.updateProvince);
router.delete("/delete/:provinceId", Province_1.default.deleteProvince);
module.exports = router;
