"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const games_services_1 = __importDefault(require("../service/games.services"));
const logger_1 = require("../../../helpers/logger");
const service = new games_services_1.default();
class gameController {
    /**  CREATE GAME  **/
    createGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const data = req.body;
                //Service:
                const resService = yield service.createGame(data);
                //Response:
                if (resService === "ERROR_CREATE") {
                    return res.status(500).json({ status: 500, msg: resService });
                }
                else if (resService === "NAME_ALREADY_IN_USE" ||
                    resService === "INVALID_ID" ||
                    resService === "PLATFORM_NOT_FOUND" ||
                    resService === "GENDER_NOT_FOUND" ||
                    resService === "COMPANY_NOT_FOUND") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else {
                    return res
                        .status(201)
                        .json({ status: 201, msg: "GAME_CREATED", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  LIST GAMES  **/
    listGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                //Service:
                const resService = yield service.listGames(page, limit);
                //Return:
                return res.status(200).json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  UPLOAD GAME IMAGE  **/
    uploadGameImg(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const { file } = req;
                const id = req.params.id;
                if (!file) {
                    return res.status(400).json({ status: 400, msg: "FILE_REQUIRED" });
                }
                //Service:
                const resService = yield service.uploadGameImage(id, file.buffer);
                //Response:
                if (resService === "GAME_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else if (resService === "INVALID_PATH") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "ERROR_EDIT") {
                    return res.status(500).json({ status: 500, msg: resService });
                }
                else {
                    return res
                        .status(201)
                        .json({ status: 201, msg: "IMAGE_UPLOADED", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  EDIT GAME **/
    editGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const id = req.params.id;
                const data = req.body;
                //Service:
                const resService = yield service.editGame(id, data);
                //Return:
                if (resService === "GAME_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else if (resService === "INVALID_ID" ||
                    resService === "PLATFORM_NOT_FOUND" ||
                    resService === "GENDER_NOT_FOUND" ||
                    resService === "COMPANY_NOT_FOUND") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "ERROR_EDIT") {
                    return res.status(500).json({ status: 500, msg: resService });
                }
                else {
                    return res
                        .status(201)
                        .json({ status: 201, msg: "GAME_EDITED", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  DELETE GAME **/
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const id = req.params.id;
                //Service:
                const resService = yield service.deleteGame(id);
                //Return:
                if (resService === "GAME_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else if (resService === "INVALID_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else {
                    return res.status(200).json({ status: 200, msg: "GAME_DELETED" });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  LIST GAME BY COMPANY **/
    listByCompany(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const name = req.params.name;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                //Service:
                const resService = yield service.listByCompany(name, page, limit);
                //Return:
                if (resService === "COMPANY_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else {
                    return res
                        .status(200)
                        .json({ status: 200, msg: "OK", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**   LIST GAMES BY PLATFORM   **/
    listByPlatform(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const name = req.params.name;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                //Service:
                const resService = yield service.listByPlatform(name, page, limit);
                //Return:
                if (resService === "PLATFORM_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else {
                    return res
                        .status(200)
                        .json({ status: 200, msg: "OK", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**   LIST GAMES BY GENDER   **/
    listByGender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const name = req.params.name;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                //Service:
                const resService = yield service.listByGender(name, page, limit);
                //Return:
                if (resService === "GENDER_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else {
                    return res
                        .status(200)
                        .json({ status: 200, msg: "OK", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**   LIST GAMES BY ID   **/
    listByID(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const id = req.params.id;
                //Service:
                const resService = yield service.listByID(id);
                //Return:
                if (resService === "GAME_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else {
                    return res
                        .status(200)
                        .json({ status: 200, msg: "OK", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**   LIST GAMES BY NAME  **/
    listByName(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //data:
                const name = req.params.name;
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                //Service:
                const resService = yield service.listByName(name, page, limit);
                //Return:
                return res.status(200).json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
}
exports.default = gameController;
