import express from "express";
import controller from "../controllers/Item";

const router = express.Router();

router.post("/create", controller.createItem);
router.get("/get/:itemId", controller.readItem);
router.get("/get/", controller.readAllItem);
router.put("/update/", controller.updateItem);
router.delete("/delete/:itemId", controller.deleteItem);

export = router;
