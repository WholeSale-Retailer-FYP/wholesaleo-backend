import express from "express";
import controller from "../../controllers/retailer/Retailer";

const router = express.Router();

router.post("/create", controller.createRetailer);
router.get("/get/:retailerId", controller.readRetailer);
router.get("/get/", controller.readAllRetailer);
router.put("/update/verify", controller.verifyRetailer);
router.put("/update/", controller.updateRetailer);
router.delete("/delete/:retailerId", controller.deleteRetailer);

export = router;
