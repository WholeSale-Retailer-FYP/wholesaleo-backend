import multer from "multer";
import { Request } from "express";
const path = require("node:path");

const fileFilter = (req: Request, file: any, cb: any) => {
  const ext = path.extname(file.originalname);
  console.log("file extension", ext);
  if (ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
// TODO: Add file size limit, file type filter, etc.
const storage = multer.diskStorage({});
const multerUploads = multer({
  storage,
  //   fileFilter,
  //   500KB
  limits: { fileSize: 500000, files: 1 },
}).single("image");
export { multerUploads };
