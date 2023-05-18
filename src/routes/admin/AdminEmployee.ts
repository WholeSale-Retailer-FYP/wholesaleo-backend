import express from "express";
import controller from "../../controllers/admin/AdminEmployee";
import { auth } from "../../middleware/auth";

// import { Roles } from "../../models/admin/AdminEmployee";
const router = express.Router();

router.post("/create", controller.create);
router.get(
  "/get/count",
  // auth([Roles.Manager, Roles.Employee]),
  controller.getCount
);
router.get(
  "/get/:adminEmployeeId",
  // auth([Roles.Manager, Roles.Employee]),
  controller.read
);
router.get("/get/", controller.readAll);
router.put("/update/", controller.update);
router.delete("/delete/:retailerId", controller.deleteAdminEmployee);

export = router;
