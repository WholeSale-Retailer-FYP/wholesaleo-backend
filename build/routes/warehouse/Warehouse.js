"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Warehouse_1 = __importDefault(require("../../controllers/warehouse/Warehouse"));
const router = express_1.default.Router();
router.post("/create", Warehouse_1.default.createWarehouse);
router.get("/get/", Warehouse_1.default.readAllWarehouse);
router.get("/get/:warehouseId", Warehouse_1.default.readWarehouse);
router.get("/get/analytics/:warehouseId", Warehouse_1.default.dashboardAnalytics);
router.put("/update/verify", Warehouse_1.default.verifyWarehouse);
router.put("/update/", Warehouse_1.default.updateWarehouse);
router.delete("/delete/:warehouseId", Warehouse_1.default.deleteWarehouse);
module.exports = router;
