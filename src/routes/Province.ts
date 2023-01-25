import express from "express";
import controller from "../controllers/Province";

const router = express.Router();

router.post("/create", controller.createProvince);
router.get("/get/:provinceId", controller.readProvince);
router.get("/get/", controller.readAllProvince);
router.put("/update/", controller.updateProvince);
router.delete("/delete/:provinceId", controller.deleteProvince);

export = router;
