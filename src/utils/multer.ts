import multer from "multer";

// TODO: Add file size limit, file type filter, etc.
const storage = multer.diskStorage({});
const multerUploads = multer({ storage }).single("image");
export { multerUploads };
