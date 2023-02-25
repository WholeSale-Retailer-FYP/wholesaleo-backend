import express from "express";
import controller from "../controllers/Complaint";

const router = express.Router();

router.post("/create", controller.createComplaint);
router.get("/get/:complaintId", controller.readComplaint);
router.get("/get/", controller.readAllComplaint);
router.put("/update/", controller.updateComplaint);
router.delete("/delete/:complaintId", controller.deleteComplaint);

export = router;
