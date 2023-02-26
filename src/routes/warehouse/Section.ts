import express from "express";
import controller from "../../controllers/warehouse/Section";

const router = express.Router();

router.post("/create", controller.createSection);
router.get("/get/:sectionId", controller.readSection);
router.get("/get/", controller.readAllSection);
router.put("/update/", controller.updateSection);
router.delete("/delete/:sectionId", controller.deleteSection);

export = router;
