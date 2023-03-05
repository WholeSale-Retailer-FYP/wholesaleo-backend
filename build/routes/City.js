"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const City_1 = __importDefault(require("../controllers/City"));
const router = express_1.default.Router();
router.post("/create", City_1.default.createCity);
router.get("/get/:cityId", City_1.default.readCity);
router.get("/get/", City_1.default.readAllCity);
router.get("/get/province/:provinceId", City_1.default.getAllCitiesOfProvince);
router.put("/update/", City_1.default.updateCity);
router.delete("/delete/:cityId", City_1.default.deleteCity);
module.exports = router;
