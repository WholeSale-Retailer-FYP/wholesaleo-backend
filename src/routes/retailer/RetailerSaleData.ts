import express from "express";
import controller from "../../controllers/retailer/RetailerSaleData";

const router = express.Router();

router.post("/create", controller.createRetailerSaleData);
router.get("/get/:retailerSaleDataId", controller.readRetailerSaleData);
router.get("/get/", controller.readAllRetailerSaleData);
router.put("/update/", controller.updateRetailerSaleData);
router.delete("/delete/:retailerSaleDataId", controller.deleteRetailerSaleData);

export = router;
