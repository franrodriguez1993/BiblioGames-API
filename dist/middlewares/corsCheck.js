"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const configServer_1 = __importDefault(require("../config/configServer"));
const modeServer = configServer_1.default.server.mode;
const corsCheckMiddleware = (req, res, next) => {
    if (modeServer === "production") {
        return res.status(403).json({
            status: 403,
            msg: "Block by CORS - You don't have access to this request.",
        });
    }
    else {
        next();
    }
};
exports.default = corsCheckMiddleware;
