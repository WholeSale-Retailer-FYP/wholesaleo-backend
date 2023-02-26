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
// TODO: Account Payable implementation
var ShopSize;
(function (ShopSize) {
    ShopSize[ShopSize["SINGLE"] = 0] = "SINGLE";
    ShopSize[ShopSize["SMALL"] = 1] = "SMALL";
    ShopSize[ShopSize["MEDIUM"] = 2] = "MEDIUM";
    ShopSize[ShopSize["LARGE"] = 3] = "LARGE";
})(ShopSize || (ShopSize = {}));
const RetailerSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    cnic: { type: String, required: true, unique: true },
    phoneNumber: { type: String, required: true, unique: true },
    shopName: { type: String, required: true },
    postalCode: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    verified: { type: Boolean, default: false },
    provinceId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Province", required: true },
    cityId: { type: mongoose_1.Schema.Types.ObjectId, ref: "City", required: true },
    regionId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Region", required: true },
    warehouseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
    shopSize: { type: Number, enum: ShopSize, required: true },
});
exports.default = mongoose_1.default.model("Retailer", RetailerSchema);
