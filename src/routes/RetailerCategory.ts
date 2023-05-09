import express from "express";
import controller from "../controllers/RetailerCategory";

const router = express.Router();

router.post("/create", controller.createRetailerCategory);
router.get("/get/:retailerCategoryId", controller.readRetailerCategory);
router.get("/get/", controller.readAllRetailerCategory);
router.put("/update/", controller.updateRetailerCategory);
router.delete("/delete/:retailerCategoryId", controller.deleteRetailerCategory);

export = router;
