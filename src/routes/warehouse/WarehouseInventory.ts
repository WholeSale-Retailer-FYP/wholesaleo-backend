import express from "express";
import controller from "../../controllers/warehouse/WarehouseInventory";

const router = express.Router();

router.post("/create", controller.createWarehouseInventory);
router.get("/get/", controller.readAllWarehouseInventory);
router.get("/get/:warehouseInventoryId", controller.readWarehouseInventory);
router.get("/get/warehouse/:warehouseId", controller.readInventoryOfWarehouse);
router.get(
  "/get/ofCategory/:itemCategoryId/:warehouseId",
  controller.readWarehouseItemOfCategory
);
router.put("/update/", controller.updateWarehouseInventory);
router.get("/search/:query/:warehouseId", controller.searchItem);
router.get(
  "/forecast-detailed/:warehouseId/:numDays",
  controller.inventoryForecastDetailed
);
router.delete(
  "/delete/:warehouseInventoryId",
  controller.deleteWarehouseInventory
);

export = router;
