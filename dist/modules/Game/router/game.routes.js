"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
//Controller:
const game_ctrl_1 = __importDefault(require("../controller/game.ctrl"));
//Middlewares:
const uploaderImg = (0, multer_1.default)({ storage: multer_1.default.memoryStorage() });
const BodyValidator_1 = require("../../../middlewares/BodyValidator");
const corsCheck_1 = __importDefault(require("../../../middlewares/corsCheck"));
const controller = new game_ctrl_1.default();
//Router:
const router = (0, express_1.Router)();
exports.router = router;
router.post("/create", corsCheck_1.default, BodyValidator_1.validateBodyGameCreate, controller.createGame);
router.post("/img/:id", corsCheck_1.default, uploaderImg.single("image"), controller.uploadGameImg);
router.put("/edit/:id", corsCheck_1.default, BodyValidator_1.validateBodyGameEdit, controller.editGame);
router.get("/list", controller.listGames);
router.get("/list/id/:id", controller.listByID);
router.get("/list/name/:name", controller.listByName);
router.get("/list/company/:name", controller.listByCompany);
router.get("/list/platform/:name", controller.listByPlatform);
router.get("/list/gender/:name", controller.listByGender);
router.delete("/delete/:id", corsCheck_1.default, controller.deleteGame);
