"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Region_1 = __importDefault(require("../controllers/Region"));
const router = express_1.default.Router();
router.post("/create", Region_1.default.createRegion);
router.get("/get/:regionId", Region_1.default.readRegion);
router.get("/get/", Region_1.default.readAllRegion);
router.get("/get/city/:cityId", Region_1.default.getAllRegionsOfCity);
router.put("/update/", Region_1.default.updateRegion);
router.delete("/delete/:regionId", Region_1.default.deleteRegion);
module.exports = router;
