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
const mongoose_1 = __importStar(require("mongoose"));
var Roles;
(function (Roles) {
    Roles[Roles["Manager"] = 1] = "Manager";
    Roles[Roles["Employee"] = 2] = "Employee";
})(Roles || (Roles = {}));
const WarehouseEmployeeSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    warehouseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "Warehouse",
    },
    phoneNumber: { type: String, required: true, unique: true },
    cnic: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: Number,
        enum: Roles,
        default: Roles.Employee,
        required: true,
    },
}, {
    versionKey: false,
});
exports.default = mongoose_1.default.model("WarehouseEmployee", WarehouseEmployeeSchema);
