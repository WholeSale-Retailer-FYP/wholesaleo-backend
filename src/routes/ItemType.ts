import express from "express";
import controller from "../controllers/ItemType";

const router = express.Router();

router.post("/create", controller.createItemType);
router.get("/get/:itemTypeId", controller.readItemType);
router.get("/get/", controller.readAllItemType);
router.put("/update/", controller.updateItemType);
router.delete("/delete/:itemTypeId", controller.deleteItemType);

export = router;
