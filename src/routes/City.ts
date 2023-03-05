import express from "express";
import controller from "../controllers/City";

const router = express.Router();

router.post("/create", controller.createCity);
router.get("/get/:cityId", controller.readCity);
router.get("/get/", controller.readAllCity);
router.get("/get/province/:provinceId", controller.getAllCitiesOfProvince);
router.put("/update/", controller.updateCity);
router.delete("/delete/:cityId", controller.deleteCity);

export = router;
