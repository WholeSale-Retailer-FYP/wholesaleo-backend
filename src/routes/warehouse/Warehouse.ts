import express from "express";
import controller from "../../controllers/warehouse/Warehouse";

const router = express.Router();

router.post("/create", controller.createWarehouse);
router.get("/get/:warehouseId", controller.readWarehouse);
router.get("/get/", controller.readAllWarehouse);
router.put("/update/verify", controller.verifyWarehouse);
router.put("/update/", controller.updateWarehouse);
router.delete("/delete/:warehouseId", controller.deleteWarehouse);

export = router;
