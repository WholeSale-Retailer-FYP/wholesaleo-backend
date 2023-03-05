import express from "express";
import controller from "../controllers/Region";

const router = express.Router();

router.post("/create", controller.createRegion);
router.get("/get/:regionId", controller.readRegion);
router.get("/get/", controller.readAllRegion);
router.get("/get/city/:cityId", controller.getAllRegionsOfCity);
router.put("/update/", controller.updateRegion);
router.delete("/delete/:regionId", controller.deleteRegion);

export = router;
