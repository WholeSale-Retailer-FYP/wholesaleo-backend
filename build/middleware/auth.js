"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = exports.SECRET_KEY = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
exports.SECRET_KEY = process.env.SECRET_KEY;
const auth = (roles) => {
    return (req, res, next) => {
        var _a;
        try {
            const token = (_a = req.header("Authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
            if (!token)
                throw new Error("No JWT token found");
            const decoded = jsonwebtoken_1.default.verify(token, exports.SECRET_KEY, function (err, decoded) {
                console.log("first");
                if (err)
                    throw new Error("Invalid JWT token");
                else
                    return decoded;
            });
            if (!roles.includes(decoded.data.role))
                throw new Error("You do not have necessary permissions to perform this action!");
            req.token = decoded;
            next();
        }
        catch (error) {
            if (error instanceof Error)
                res.status(401).send({ message: error.message });
        }
    };
};
exports.auth = auth;
