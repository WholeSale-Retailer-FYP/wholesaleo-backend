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
const Section_1 = __importDefault(require("../../models/warehouse/Section"));
// Routes needed:
// Verify section
const createSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, capacity, warehouseId } = req.body;
    try {
        const section = yield Section_1.default.create({
            name,
            capacity,
            warehouseId,
        });
        res.status(201).json({ data: section });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sectionId = req.params.sectionId;
        const section = yield Section_1.default.findById(sectionId);
        if (!section) {
            throw new Error("Section Not Found");
        }
        res.status(200).json({ data: section });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sections = yield Section_1.default.find();
        res.status(200).json({ data: sections });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const verifySection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id } = req.body;
        const updatedSection = yield Section_1.default.updateOne({ _id }, {
            verified: true,
        });
        if (!updatedSection)
            throw new Error("Section not found!");
        res.status(201).json({ data: updatedSection });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, capacity, warehouseId, currentQuantity } = req.body;
        const updatedSection = yield Section_1.default.updateOne({ _id }, {
            name,
            capacity,
            warehouseId,
            currentQuantity,
        });
        if (!updatedSection)
            throw new Error("Section not found!");
        res.status(201).json({ data: updatedSection });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteSection = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.sectionId;
        const section = yield Section_1.default.deleteOne({ _id });
        if (!section)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createSection,
    readAllSection,
    readSection,
    verifySection,
    updateSection,
    deleteSection,
};
