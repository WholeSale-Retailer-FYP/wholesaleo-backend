import express from "express";
import { cloudinaryConfig } from "../config/cloudinaryConfig";
import controller from "../controllers/Item";
import * as multerUploads from "../utils/multer";

const router = express.Router();

router.post(
  "/create",
  cloudinaryConfig,
  multerUploads.multerUploads,
  controller.createItem
);
router.get("/get/:itemId", controller.readItem);
router.get("/get/", controller.readAllItem);
router.put("/update/", controller.updateItem);
router.delete("/delete/:itemId", controller.deleteItem);

export = router;
