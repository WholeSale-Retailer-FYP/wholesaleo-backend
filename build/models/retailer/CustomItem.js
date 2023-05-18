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
const CustomItemSchema = new mongoose_1.Schema({
    _id: { type: mongoose_1.Schema.Types.ObjectId, auto: true },
    name: { type: String, required: true },
    image: {
        type: String,
        required: true,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2YQz36i4j0vszGg7Tlyo5kDPUEmcSmAjtJi7BetjBwh0ufwy1tVlsmIvc3o8wwWn0AY0&usqp=CAU",
    },
    weight: { type: Number, required: true },
    description: { type: String, required: true },
    sellingPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    quantity: { type: Number, required: true },
    retailerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Retailer", required: true },
    customCategoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "CustomCategory",
        required: true,
    },
});
exports.default = mongoose_1.default.model("CustomItem", CustomItemSchema);
