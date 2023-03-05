"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
//Controller:
const company_ctrl_1 = __importDefault(require("../controller/company.ctrl"));
const controller = new company_ctrl_1.default();
//Middlewares:
const BodyValidator_1 = require("../../../middlewares/BodyValidator");
const corsCheck_1 = __importDefault(require("../../../middlewares/corsCheck"));
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", corsCheck_1.default, BodyValidator_1.validateBodyFeature, controller.createCompany);
router.get("/list", controller.listCompanies);
router.put("/edit/:id", corsCheck_1.default, controller.editCompany);
router.delete("/delete/:id", corsCheck_1.default, controller.deleteCompany);
