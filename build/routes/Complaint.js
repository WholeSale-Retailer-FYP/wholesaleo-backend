"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Complaint_1 = __importDefault(require("../controllers/Complaint"));
const router = express_1.default.Router();
router.post("/create", Complaint_1.default.createComplaint);
router.get("/get/:complaintId", Complaint_1.default.readComplaint);
router.get("/get/", Complaint_1.default.readAllComplaint);
router.put("/update/", Complaint_1.default.updateComplaint);
router.delete("/delete/:complaintId", Complaint_1.default.deleteComplaint);
module.exports = router;
