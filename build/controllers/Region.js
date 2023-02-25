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
const Region_1 = __importDefault(require("../models/Region"));
const createRegion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, cityId } = req.body;
    try {
        const region = yield Region_1.default.create({ name, cityId });
        res.status(201).json({ data: region });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readRegion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regionId = req.params.regionId;
        const region = yield Region_1.default.findById(regionId).populate({
            path: "cityId",
            populate: {
                path: "provinceId",
            },
        });
        if (!region) {
            throw new Error("Region Not Found");
        }
        res.status(200).json({ data: region });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllRegion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const regions = yield Region_1.default.find().populate({
            path: "cityId",
            populate: {
                path: "provinceId",
            },
        });
        res.status(200).json({ data: regions });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateRegion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, cityId } = req.body;
        const updatedRegion = yield Region_1.default.updateOne({ _id }, { name, cityId: cityId });
        if (!updatedRegion)
            throw new Error("Region not found!");
        res.status(201).json({ data: updatedRegion });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteRegion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.regionId;
        const region = yield Region_1.default.deleteOne({ _id });
        if (!region)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createRegion,
    readAllRegion,
    readRegion,
    updateRegion,
    deleteRegion,
};
