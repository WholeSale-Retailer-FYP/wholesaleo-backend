"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Sales_1 = __importDefault(require("../../controllers/warehouse/Sales"));
const router = express_1.default.Router();
router.get("/get/:warehouseId", Sales_1.default.readWarehouseSales);
router.get("/finances/:warehouseId", Sales_1.default.finances);
router.put("/update/orderStatus", Sales_1.default.updateOrderStatus);
module.exports = router;
