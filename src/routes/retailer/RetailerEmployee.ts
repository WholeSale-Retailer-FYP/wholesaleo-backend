import express from "express";
import controller from "../../controllers/retailer/RetailerEmployee";
import { cloudinaryConfig } from "../../config/cloudinaryConfig";
import * as multerUploads from "../../middleware/multer";

const router = express.Router();

router.post("/create", controller.createRetailerEmployee);
router.get("/get/:retailerEmployeeId", controller.readRetailerEmployee);
router.get("/get/", controller.readAllRetailerEmployee);
router.post("/login/", controller.loginRetailerEmployee);
router.put("/update/", controller.updateRetailerEmployee);
router.put("/update/password", controller.updatePassword);
router.put(
  "/update/image",
  cloudinaryConfig,
  multerUploads.multerUploads,
  controller.updateImage
);
router.delete("/delete/:retailerEmployeeId", controller.deleteRetailerEmployee);

export = router;
