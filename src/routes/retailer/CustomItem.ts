import express from "express";
import controller from "../../controllers/retailer/CustomItem";

const router = express.Router();

router.post("/create", controller.createCustomItem);
router.get("/get/", controller.getAllCustomItem);
router.get("/get/:customItemId", controller.getCustomItemById);
router.get("/get/retailer/:retailerId", controller.getCustomItemOfRetailer);
router.put("/update/", controller.updateCustomItemById);
router.delete("/delete/:customItemId", controller.deleteCustomItemById);

export = router;
