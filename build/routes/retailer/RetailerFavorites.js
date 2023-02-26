"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const RetailerFavorites_1 = __importDefault(require("../../controllers/retailer/RetailerFavorites"));
const router = express_1.default.Router();
router.post("/create", RetailerFavorites_1.default.createRetailerFavorites);
router.get("/get/:retailerFavoritesId", RetailerFavorites_1.default.readRetailerFavorites);
router.get("/get/", RetailerFavorites_1.default.readAllRetailerFavorites);
router.put("/update/", RetailerFavorites_1.default.updateRetailerFavorites);
router.delete("/delete/:retailerFavoritesId", RetailerFavorites_1.default.deleteRetailerFavorites);
module.exports = router;
