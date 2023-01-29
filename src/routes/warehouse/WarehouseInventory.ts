import express from "express";
import controller from "../../controllers/warehouse/WarehouseInventory";

const router = express.Router();

router.post("/create", controller.createWarehouseInventory);
router.get("/get/:warehouseInventoryId", controller.readWarehouseInventory);
router.get(
  "/get/warehouse/:warehouseId",
  controller.readWarehouseInventoryOfWarehouse
);
router.get("/get/", controller.readAllWarehouseInventory);
router.put("/update/", controller.updateWarehouseInventory);
router.delete(
  "/delete/:warehouseInventoryId",
  controller.deleteWarehouseInventory
);

export = router;
