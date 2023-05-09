import express from "express";
import controller from "../../controllers/warehouse/Sales";

const router = express.Router();

router.get("/get/:warehouseId", controller.readWarehouseSales);
router.get("/finances/:warehouseId", controller.finances);
router.put("/update/orderStatus", controller.updateOrderStatus);

export = router;
