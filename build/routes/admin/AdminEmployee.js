"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const AdminEmployee_1 = __importDefault(require("../../controllers/admin/AdminEmployee"));
// import { Roles } from "../../models/admin/AdminEmployee";
const router = express_1.default.Router();
router.post("/create", AdminEmployee_1.default.create);
router.get("/get/:adminEmployeeId", 
// auth([Roles.Manager, Roles.Employee]),
AdminEmployee_1.default.read);
router.get("/get/", AdminEmployee_1.default.readAll);
router.put("/update/", AdminEmployee_1.default.update);
router.delete("/delete/:retailerId", AdminEmployee_1.default.deleteAdminEmployee);
module.exports = router;
