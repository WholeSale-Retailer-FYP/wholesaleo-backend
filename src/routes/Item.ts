import express from "express";
import { cloudinaryConfig } from "../config/cloudinaryConfig";
import * as multerUploads from "../middleware/multer";
import controller from "../controllers/Item";

const router = express.Router();

router.post(
  "/create",
  cloudinaryConfig,
  multerUploads.multerUploads,
  controller.createItem
);
router.post("/createFromUrl", controller.createItemFromImageLink);
router.get("/get/:itemId", controller.readItem);
router.get("/get/category/:itemCategoryId", controller.readItemOfCategory);
router.get("/get/", controller.readAllItem);
router.put(
  "/update/",
  cloudinaryConfig,
  multerUploads.multerUploads,
  controller.updateItem
);
router.get("/search/:query", controller.searchItem);
router.delete("/delete/:itemId", controller.deleteItem);

export = router;
