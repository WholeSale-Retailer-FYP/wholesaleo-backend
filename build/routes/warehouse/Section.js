"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Section_1 = __importDefault(require("../../controllers/warehouse/Section"));
const router = express_1.default.Router();
router.post("/create", Section_1.default.createSection);
router.get("/get/:sectionId", Section_1.default.readSection);
router.get("/get/", Section_1.default.readAllSection);
router.put("/update/", Section_1.default.updateSection);
router.delete("/delete/:sectionId", Section_1.default.deleteSection);
module.exports = router;
