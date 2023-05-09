"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const WarehouseEmployee_1 = __importDefault(require("../../controllers/warehouse/WarehouseEmployee"));
const router = express_1.default.Router();
router.post("/create", WarehouseEmployee_1.default.createWarehouseEmployee);
router.get("/get/:warehouseEmployeeId", WarehouseEmployee_1.default.readWarehouseEmployee);
router.get("/get/", WarehouseEmployee_1.default.readAllWarehouseEmployee);
router.put("/update/", WarehouseEmployee_1.default.updateWarehouseEmployee);
router.delete("/delete/:warehouseEmployeeId", WarehouseEmployee_1.default.deleteWarehouseEmployee);
module.exports = router;
