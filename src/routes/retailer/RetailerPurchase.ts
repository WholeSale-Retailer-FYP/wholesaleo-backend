import express from "express";
import controller from "../../controllers/retailer/RetailerPurchase";

const router = express.Router();

router.post("/create", controller.createRetailerPurchase);
router.get("/get/:retailerPurchaseId", controller.readRetailerPurchase);
router.get("/get/", controller.readAllRetailerPurchase);
router.put("/update/", controller.updateRetailerPurchase);
router.delete("/delete/:retailerPurchaseId", controller.deleteRetailerPurchase);

export = router;
