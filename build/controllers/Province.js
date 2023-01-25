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
const Province_1 = __importDefault(require("../models/Province"));
const createProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.body;
    try {
        const province = yield Province_1.default.create({ name });
        res.status(201).json({ data: province });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinceId = req.params.provinceId;
        const province = yield Province_1.default.findById(provinceId);
        if (province) {
            res.status(200).json({ data: province });
        }
        throw new Error("Province Not Found");
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const readAllProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinces = yield Province_1.default.find();
        res.status(200).json({ data: provinces });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const updateProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name } = req.body;
        console.log("first");
        const updatedProvince = yield Province_1.default.updateOne({ _id }, { name: name });
        if (!updatedProvince)
            throw new Error("Province not found!");
        res.status(201).json({ data: updatedProvince });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
const deleteProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.provinceId;
        const province = yield Province_1.default.deleteOne({ _id });
        if (!province)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        res.status(500).json({ message: error });
    }
});
exports.default = {
    createProvince,
    readAllProvince,
    readProvince,
    updateProvince,
    deleteProvince,
};
