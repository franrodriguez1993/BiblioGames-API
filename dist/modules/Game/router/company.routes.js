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
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", BodyValidator_1.validateBodyFeature, controller.createCompany);
router.get("/list", controller.listCompanies);
router.put("/edit/:id", controller.editCompany);
router.delete("/delete/:id", controller.deleteCompany);
