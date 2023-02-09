import express from "express";
import { cloudinaryConfig } from "../config/cloudinaryConfig";
import * as multerUploads from "../utils/multer";
import controller from "../controllers/Item";

const router = express.Router();

router.post(
  "/create",
  cloudinaryConfig,
  multerUploads.multerUploads,
  controller.createItem
);
router.get("/get/:itemId", controller.readItem);
router.get("/get/category/:itemCategoryId", controller.readItemOfCategory);
router.get("/get/", controller.readAllItem);
router.put("/update/", controller.updateItem);
router.delete("/delete/:itemId", controller.deleteItem);

export = router;
