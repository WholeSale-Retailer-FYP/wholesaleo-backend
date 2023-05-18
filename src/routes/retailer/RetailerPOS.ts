import express from "express";
import controller from "../../controllers/retailer/RetailerPOS";

const router = express.Router();

router.post("/create", controller.createRetailerPOS);
router.get("/get/:retailerPOSId", controller.readRetailerPOS);
router.get("/get/", controller.readAllRetailerPOS);
router.get(
  "/get/ofRetailer/:retailerId",
  controller.getAllRetailerPOSOfSingleRetailer
);
router.put("/update/", controller.updateRetailerPOS);
router.delete("/delete/:retailerPOSId", controller.deleteRetailerPOS);

export = router;
