import express from "express";
import controller from "../../controllers/retailer/CustomCategory";

const router = express.Router();

router.post("/create", controller.createCustomCategory);
router.get("/get/", controller.getAllCustomCategories);
router.get("/get/:customCategoryId", controller.getCustomCategoryById);
router.get(
  "/get/retailer/:retailerId",
  controller.getCustomerCategoryOfRetailer
);
router.put("/update/", controller.updateCustomCategoryById);
router.delete("/delete/:customCategoryId", controller.deleteCustomCategoryById);

export = router;
