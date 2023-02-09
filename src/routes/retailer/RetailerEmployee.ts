import express from "express";
import controller from "../../controllers/retailer/RetailerEmployee";

const router = express.Router();

router.post("/create", controller.createRetailerEmployee);
router.get("/get/:retailerEmployeeId", controller.readRetailerEmployee);
router.get("/get/", controller.readAllRetailerEmployee);
router.post("/login/", controller.loginRetailerEmployee);
router.put("/update/", controller.updateRetailerEmployee);
router.delete("/delete/:retailerEmployeeId", controller.deleteRetailerEmployee);

export = router;
