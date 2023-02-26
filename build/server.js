"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config/config");
const Logging_1 = __importDefault(require("./library/Logging"));
const Province_1 = __importDefault(require("./routes/Province"));
const City_1 = __importDefault(require("./routes/City"));
const Region_1 = __importDefault(require("./routes/Region"));
const ItemCategory_1 = __importDefault(require("./routes/ItemCategory"));
const Item_1 = __importDefault(require("./routes/Item"));
const Complaint_1 = __importDefault(require("./routes/Complaint"));
const RetailerCategory_1 = __importDefault(require("./routes/RetailerCategory"));
const Warehouse_1 = __importDefault(require("./routes/warehouse/Warehouse"));
const WarehouseEmployee_1 = __importDefault(require("./routes/warehouse/WarehouseEmployee"));
const WarehouseInventory_1 = __importDefault(require("./routes/warehouse/WarehouseInventory"));
const Section_1 = __importDefault(require("./routes/warehouse/Section"));
const Retailer_1 = __importDefault(require("./routes/retailer/Retailer"));
const RetailerEmployee_1 = __importDefault(require("./routes/retailer/RetailerEmployee"));
const RetailerInventory_1 = __importDefault(require("./routes/retailer/RetailerInventory"));
const RetailerPOS_1 = __importDefault(require("./routes/retailer/RetailerPOS"));
const RetailerSaleData_1 = __importDefault(require("./routes/retailer/RetailerSaleData"));
const RetailerPurchase_1 = __importDefault(require("./routes/retailer/RetailerPurchase"));
const RetailerPurchaseData_1 = __importDefault(require("./routes/retailer/RetailerPurchaseData"));
const RetailerFavorites_1 = __importDefault(require("./routes/retailer/RetailerFavorites"));
const router = (0, express_1.default)();
/** Connect to Mongo */
mongoose_1.default
    .connect(config_1.config.mongo.url, { retryWrites: true, w: "majority" })
    .then(() => {
    Logging_1.default.info("Mongo connected successfully.");
    StartServer();
})
    .catch((error) => Logging_1.default.error(error));
/** Only Start Server if Mongoose Connects */
const StartServer = () => {
    /** Log the request */
    router.use((req, res, next) => {
        /** Log the req */
        Logging_1.default.info(`Incomming - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on("finish", () => {
            /** Log the res */
            Logging_1.default.info(`Result - METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}] - STATUS: [${res.statusCode}]`);
        });
        next();
    });
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
    /** Rules of our API */
    router.use((req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        if (req.method == "OPTIONS") {
            res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
            return res.status(200).json({});
        }
        next();
    });
    /** Routes */
    router.use("/province", Province_1.default);
    router.use("/city", City_1.default);
    router.use("/region", Region_1.default);
    router.use("/itemCategory", ItemCategory_1.default);
    router.use("/item", Item_1.default);
    router.use("/complaint", Complaint_1.default);
    router.use("/retailerCategory", RetailerCategory_1.default);
    router.use("/warehouse", Warehouse_1.default);
    router.use("/warehouseEmployee", WarehouseEmployee_1.default);
    router.use("/warehouseInventory", WarehouseInventory_1.default);
    router.use("/section", Section_1.default);
    router.use("/retailer", Retailer_1.default);
    router.use("/retailerEmployee", RetailerEmployee_1.default);
    router.use("/retailerInventory", RetailerInventory_1.default);
    router.use("/retailerPOS", RetailerPOS_1.default);
    router.use("/retailerSaleData", RetailerSaleData_1.default);
    router.use("/retailerPurchase", RetailerPurchase_1.default);
    router.use("/retailerPurchaseData", RetailerPurchaseData_1.default);
    router.use("/retailerFavorites", RetailerFavorites_1.default);
    /** Healthcheck */
    router.get("/ping", (req, res, next) => res.status(200).json({ hello: "world" }));
    /** Error handling */
    router.use((req, res, next) => {
        const error = new Error("Route Not found");
        Logging_1.default.error(error);
        res.status(404).json({
            message: error.message,
        });
    });
    http_1.default
        .createServer(router)
        .listen(config_1.config.server.port, () => Logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
