import express from "express";
import controller from "../../controllers/retailer/RetailerFavorites";

const router = express.Router();

router.post("/create", controller.createRetailerFavorites);
router.get("/get/:retailerFavoritesId", controller.readRetailerFavorites);
router.get("/get/retailer/:retailerId", controller.readFavoritesOfRetailer);
router.get("/get/", controller.readAllRetailerFavorites);
router.put("/update/", controller.updateRetailerFavorites);
router.delete(
  "/delete/:retailerFavoritesId",
  controller.deleteRetailerFavorites
);

export = router;
