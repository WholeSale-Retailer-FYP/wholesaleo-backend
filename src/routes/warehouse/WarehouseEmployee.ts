import express from "express";
import controller from "../../controllers/warehouse/WarehouseEmployee";

const router = express.Router();

router.post("/create", controller.createWarehouseEmployee);
router.post("/login", controller.loginEmployee);
router.get("/get/:warehouseEmployeeId", controller.readWarehouseEmployee);
router.get("/get/", controller.readAllWarehouseEmployee);
router.get("/get/of/:warehouseId", controller.readAllWarehouseEmployee);
router.put("/update/", controller.updateWarehouseEmployee);
router.delete(
  "/delete/:warehouseEmployeeId",
  controller.deleteWarehouseEmployee
);

export = router;
