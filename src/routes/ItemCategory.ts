import express from "express";
import controller from "../controllers/ItemCategory";

const router = express.Router();

router.post("/create", controller.createItemCategory);
router.get("/get/:itemCategoryId", controller.readItemCategory);
router.get("/get/", controller.readAllItemCategory);
router.put("/update/", controller.updateItemCategory);
router.delete("/delete/:itemCategoryId", controller.deleteItemCategory);

export = router;
