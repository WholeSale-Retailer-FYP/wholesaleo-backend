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
var Status;
(function (Status) {
    Status[Status["InProgress"] = 1] = "InProgress";
    Status[Status["Urgent"] = 2] = "Urgent";
    Status[Status["Complete"] = 3] = "Complete";
})(Status || (Status = {}));
const ComplaintSchema = new mongoose_1.Schema({
    retailerId: { type: mongoose_1.Schema.Types.ObjectId, ref: "Retailer", required: true },
    warehouseId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Warehouse",
        required: true,
    },
    status: {
        type: Number,
        enum: Status,
        default: Status.InProgress,
        required: true,
    },
    description: { type: String, required: true },
});
exports.default = mongoose_1.default.model("Complaint", ComplaintSchema);
