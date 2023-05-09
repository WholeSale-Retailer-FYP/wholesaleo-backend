"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Complaint_1 = __importDefault(require("../models/Complaint"));
const createComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { status, description, retailedId, warehouseId } = req.body;
    try {
        const complaint = yield Complaint_1.default.create({
            status,
            description,
            retailedId,
            warehouseId,
        });
        res.status(201).json({ data: complaint });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaintId = req.params.complaintId;
        const complaint = yield Complaint_1.default.findById(complaintId);
        if (!complaint) {
            throw new Error("Complaint Not Found");
        }
        res.status(200).json({ data: complaint });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const complaints = yield Complaint_1.default.find();
        res.status(200).json({ data: complaints });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, status, description, retailedId, warehouseId } = req.body;
        const updatedComplaint = yield Complaint_1.default.updateOne({ _id }, { status, description, retailedId, warehouseId });
        if (!updatedComplaint)
            throw new Error("Complaint not found!");
        res.status(201).json({ data: updatedComplaint });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteComplaint = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.complaintId;
        const complaint = yield Complaint_1.default.deleteOne({ _id });
        if (!complaint)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createComplaint,
    readAllComplaint,
    readComplaint,
    updateComplaint,
    deleteComplaint,
};
