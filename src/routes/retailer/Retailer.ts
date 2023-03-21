import express from "express";
import controller from "../../controllers/retailer/Retailer";
import { auth } from "../../middleware/auth";

import { Roles } from "../../models/retailer/RetailerEmployee";

const router = express.Router();

router.post("/createShop", controller.createRetailer);
router.post("/create", controller.createRetailerAndAdmin);
router.get(
  "/get/:retailerId",
  // auth([Roles.Manager, Roles.Employee]),
  controller.readRetailer
);
router.get("/get/", controller.readAllRetailer);
router.put("/update/verify", controller.verifyRetailer);
router.put("/update/", controller.updateRetailer);
router.delete("/delete/:retailerId", controller.deleteRetailer);

export = router;
