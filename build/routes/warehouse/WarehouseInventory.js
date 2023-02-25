"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const WarehouseInventory_1 = __importDefault(require("../../controllers/warehouse/WarehouseInventory"));
const router = express_1.default.Router();
router.post("/create", WarehouseInventory_1.default.createWarehouseInventory);
router.get("/get/:warehouseInventoryId", WarehouseInventory_1.default.readWarehouseInventory);
router.get("/get/warehouse/:warehouseId", WarehouseInventory_1.default.readWarehouseInventoryOfWarehouse);
router.get("/get/", WarehouseInventory_1.default.readAllWarehouseInventory);
router.put("/update/", WarehouseInventory_1.default.updateWarehouseInventory);
router.delete("/delete/:warehouseInventoryId", WarehouseInventory_1.default.deleteWarehouseInventory);
module.exports = router;
