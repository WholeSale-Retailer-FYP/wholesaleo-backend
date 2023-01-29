import express from "express";
import controller from "../../controllers/retailer/RetailerInventory";

const router = express.Router();

router.post("/create", controller.createRetailerInventory);
router.get("/get/:retailerInventoryId", controller.readRetailerInventory);
router.get(
  "/get/retailer/:retailerId",
  controller.readRetailerInventoryOfRetailer
);
router.get("/get/", controller.readAllRetailerInventory);
router.put("/update/", controller.updateRetailerInventory);
router.delete(
  "/delete/:retailerInventoryId",
  controller.deleteRetailerInventory
);

export = router;
