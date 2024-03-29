import http from "http";
import mongoose from "mongoose";
import { config } from "./config/config";
import Logging from "./library/Logging";
import express from "express";

import provinceRoutes from "./routes/Province";
import cityRoutes from "./routes/City";
import regionRoutes from "./routes/Region";
import itemCategoryRoutes from "./routes/ItemCategory";
import itemRoutes from "./routes/Item";
import itemTypeRoutes from "./routes/ItemType";
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
import CustomCategory from "./routes/retailer/CustomCategory";
import CustomItem from "./routes/retailer/CustomItem";

const router = express();

/** Connect to Mongo */
mongoose
  .connect(config.mongo.url, { retryWrites: true, w: "majority" })
  .then(() => {
    Logging.info("Mongo connected successfully.");
    StartServer();
  })
  .catch((error) => Logging.error(error));

/** Only Start Server if Mongoose Connects */
const StartServer = () => {
  /** Log the request */
  router.use((req, res, next) => {
    /** Log the req */
    // Logging.info(
    //   `Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
    // );

    // res.on("finish", () => {
    //   /** Log the res */
    //   Logging.info(
    //     `Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`
    //   );
    // });

    next();
  });

  router.use(express.urlencoded({ extended: true }));
  router.use(express.json());

  /** Rules of our API */
  router.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );

    if (req.method == "OPTIONS") {
      res.header(
        "Access-Control-Allow-Methods",
        "PUT, POST, PATCH, DELETE, GET"
      );
      return res.status(200).json({});
    }

    next();
  });

  /** Routes */
  router.use("/province", provinceRoutes);
  router.use("/city", cityRoutes);
  router.use("/region", regionRoutes);
  router.use("/itemCategory", itemCategoryRoutes);
  router.use("/item", itemRoutes);
  router.use("/itemType", itemTypeRoutes);
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
  router.use("/customCategory", CustomCategory);
  router.use("/customItem", CustomItem);

  /** Healthcheck */
  router.get("/ping", (req, res, next) =>
    res.status(200).json({ hello: "world" })
  );

  /** Error handling */
  router.use((req, res, next) => {
    const error = new Error("Route Not found");

    Logging.error(error);

    res.status(404).json({
      message: error.message,
    });
  });

  http
    .createServer(router)
    .listen(config.server.port, () =>
      Logging.info(`Server is running on port ${config.server.port}`)
    );
};
