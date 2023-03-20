import express from "express";
import controller from "../controllers/ItemCategory";
import { cloudinaryConfig } from "../config/cloudinaryConfig";
import * as multerUploads from "../middleware/multer";

const router = express.Router();

router.post(
  "/create",
  cloudinaryConfig,
  multerUploads.multerUploads,
  controller.createItemCategory
);
router.post("/createFromUrl", controller.createItemCategoryFromUrl);
router.get("/get/:itemCategoryId", controller.readItemCategory);
router.get("/get/", controller.readAllItemCategory);
router.put("/update/", controller.updateItemCategory);
router.delete("/delete/:itemCategoryId", controller.deleteItemCategory);

export = router;
