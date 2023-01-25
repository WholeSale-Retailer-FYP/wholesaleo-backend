"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const Author_1 = __importDefault(require("../controllers/Author"));
const router = express_1.default.Router();
router.post("/create", Author_1.default.createAuthor);
router.get("/get/:authorId", Author_1.default.readAuthor);
router.get("/get/", Author_1.default.readAllAuthor);
router.patch("/update/:authorId", Author_1.default.updateAuthor);
router.delete("/delete/:authorId", Author_1.default.deleteAuthor);
module.exports = router;
