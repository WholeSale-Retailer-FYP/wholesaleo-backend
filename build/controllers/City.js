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
const City_1 = __importDefault(require("../models/City"));
const createCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, provinceId } = req.body;
    try {
        const city = yield City_1.default.create({ name, provinceId });
        res.status(201).json({ data: city });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cityId = req.params.cityId;
        const city = yield City_1.default.findById(cityId).populate("provinceId", "name");
        if (city) {
            res.status(200).json({ data: city });
        }
        throw new Error("City Not Found");
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const readAllCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const citys = yield City_1.default.find().populate("provinceId", "name");
        res.status(200).json({ data: citys });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const getAllCitiesOfProvince = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const provinceId = req.params.provinceId;
        const cities = yield City_1.default.find({ provinceId: provinceId });
        res.status(200).json({ data: cities });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const updateCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, name, provinceId } = req.body;
        const updatedCity = yield City_1.default.updateOne({ _id }, { name: name, provinceId: provinceId });
        if (!updatedCity)
            throw new Error("City not found!");
        res.status(201).json({ data: updatedCity });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
const deleteCity = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const _id = req.params.cityId;
        const city = yield City_1.default.deleteOne({ _id });
        if (!city)
            throw new Error("Could not delete!");
        res.status(201).json({ data: true, message: "Deletion was successful!" });
    }
    catch (error) {
        if (error instanceof Error)
            res.status(500).json({ message: error.message });
    }
});
exports.default = {
    createCity,
    readAllCity,
    readCity,
    getAllCitiesOfProvince,
    updateCity,
    deleteCity,
};
