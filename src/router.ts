import express from "express";

import provinceRoutes from "./routes/Province";
import cityRoutes from "./routes/City";
import regionRoutes from "./routes/Region";
import itemCategoryRoutes from "./routes/ItemCategory";
import itemRoutes from "./routes/Item";
import complaintRoute from "./routes/Complaint";
import retailerCategoryRoute from "./routes/RetailerCategory";

import adminEmployeeRoutes from "./routes/admin/AdminEmployee";

import warehouseRoutes from "./routes/warehouse/Warehouse";
import warehouseEmployeeRoutes from "./routes/warehouse/WarehouseEmployee";
import warehouseInventoryRoutes from "./routes/warehouse/WarehouseInventory";
import sectionRoutes from "./routes/warehouse/Section";
import warehouseSalesRoutes from "./routes/warehouse/Sales";

import retailerRoutes from "./routes/retailer/Retailer";
import retailerEmployeeRoutes from "./routes/retailer/RetailerEmployee";
import retailerInventoryRoutes from "./routes/retailer/RetailerInventory";
import retailerPOSRoutes from "./routes/retailer/RetailerPOS";
import retailerSaleDataRoutes from "./routes/retailer/RetailerSaleData";
import retailerPurchaseRoutes from "./routes/retailer/RetailerPurchase";
import retailerPurchaseDataRoutes from "./routes/retailer/RetailerPurchaseData";
import retailerFavoritesRoutes from "./routes/retailer/RetailerFavorites";

const router = express();

/** Routes */
router.use("/province", provinceRoutes);
router.use("/city", cityRoutes);
router.use("/region", regionRoutes);
router.use("/itemCategory", itemCategoryRoutes);
router.use("/item", itemRoutes);
router.use("/complaint", complaintRoute);

router.use("/adminEmployee", adminEmployeeRoutes);

router.use("/warehouse", warehouseRoutes);
router.use("/warehouseEmployee", warehouseEmployeeRoutes);
router.use("/warehouseInventory", warehouseInventoryRoutes);
router.use("/warehouseSales", warehouseSalesRoutes);
router.use("/section", sectionRoutes);

router.use("/retailer", retailerRoutes);
router.use("/retailerEmployee", retailerEmployeeRoutes);
router.use("/retailerInventory", retailerInventoryRoutes);
router.use("/retailerPOS", retailerPOSRoutes);
router.use("/retailerSaleData", retailerSaleDataRoutes);
router.use("/retailerPurchase", retailerPurchaseRoutes);
router.use("/retailerPurchaseData", retailerPurchaseDataRoutes);
router.use("/retailerFavorites", retailerFavoritesRoutes);
router.use("/retailerCategory", retailerCategoryRoute);

export default router;
