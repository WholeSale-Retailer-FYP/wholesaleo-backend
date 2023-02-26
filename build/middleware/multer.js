"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploads = void 0;
const multer_1 = __importDefault(require("multer"));
const path = require("node:path");
const fileFilter = (req, file, cb) => {
    const ext = path.extname(file.originalname);
    console.log("file extension", ext);
    if (ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg") {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
// TODO: Add file size limit, file type filter, etc.
const storage = multer_1.default.diskStorage({});
const multerUploads = (0, multer_1.default)({
    storage,
    //   fileFilter,
    //   500KB
    // limits: { fileSize: 500000, files: 1 },
}).single("image");
exports.multerUploads = multerUploads;
