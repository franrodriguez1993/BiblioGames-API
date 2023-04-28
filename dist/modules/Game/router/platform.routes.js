"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controller:
const platform_ctrl_1 = __importDefault(require("../controller/platform.ctrl"));
const controller = new platform_ctrl_1.default();
//Middlewares:
const BodyValidator_1 = require("../../../middlewares/BodyValidator");
const corsCheck_1 = __importDefault(require("../../../middlewares/corsCheck"));
//Router:
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", corsCheck_1.default, BodyValidator_1.validateBodyFeature, controller.createPlatform);
router.get("/list", controller.listPlatforms);
router.put("/edit/:id", corsCheck_1.default, BodyValidator_1.validateBodyFeature, controller.editPlatform);
router.delete("/delete/:id", corsCheck_1.default, controller.deletePlatform);
