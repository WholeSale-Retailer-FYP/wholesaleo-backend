"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderStatus = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const uuid_1 = require("uuid");
var OrderStatus;
(function (OrderStatus) {
    OrderStatus[OrderStatus["PENDING"] = 0] = "PENDING";
    OrderStatus[OrderStatus["DISPATCHED"] = 1] = "DISPATCHED";
    OrderStatus[OrderStatus["COMPLETED"] = 2] = "COMPLETED";
    OrderStatus[OrderStatus["CANCELLED"] = 3] = "CANCELLED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
const RetailerPurchaseSchema = new mongoose_1.Schema({
    datetime: { type: Date, default: Date.now },
    orderNumber: { type: String, default: (0, uuid_1.v1)() },
    orderStatus: {
        type: Number,
        enum: OrderStatus,
        default: OrderStatus.PENDING,
    },
    retailerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Retailer",
        required: true,
    },
    numItems: { type: Number, default: 0, required: true },
    warehouseId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Warehouse" },
    totalPrice: { type: Number, default: 0, required: true },
});
exports.default = mongoose_1.default.model("RetailerPurchase", RetailerPurchaseSchema);
