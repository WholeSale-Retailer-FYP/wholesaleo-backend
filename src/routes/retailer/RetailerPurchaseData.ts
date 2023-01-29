import express from "express";
import controller from "../../controllers/retailer/RetailerPurchaseData";

const router = express.Router();

router.post("/create", controller.createRetailerPurchaseData);
router.get("/get/:retailerPurchaseDataId", controller.readRetailerPurchaseData);
router.get("/get/", controller.readAllRetailerPurchaseData);
router.put("/update/", controller.updateRetailerPurchaseData);
router.delete(
  "/delete/:retailerPurchaseDataId",
  controller.deleteRetailerPurchaseData
);

export = router;
