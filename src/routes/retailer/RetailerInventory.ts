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
router.get(
  "/get/DefaultAndCustom/retailer/:retailerId",
  controller.readDefaultAndCustomInventory
);
router.get("/forecast/:retailerId/:numDays", controller.inventoryForecast);
router.get(
  "/forecast-detailed/:retailerId/:numDays",
  controller.inventoryForecastDetailed
);
router.put("/update/", controller.updateRetailerInventory);
router.delete(
  "/delete/:retailerInventoryId",
  controller.deleteRetailerInventory
);

export = router;
