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
const logger_1 = require("../../../helpers/logger");
const gender_services_1 = __importDefault(require("../service/gender.services"));
const service = new gender_services_1.default();
class genderController {
    /**  =========== CREATE GENDER =========== **/
    createGender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const data = { name: req.body.name };
                //Service:
                const resService = yield service.createGender(data);
                //Response:
                if (resService === "NAME_ALREADY_IN_USE") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "ERROR_CREATE") {
                    return res.status(500).json({ status: 500, msg: resService });
                }
                else {
                    return res
                        .status(201)
                        .json({ status: 201, msg: "GENDER_CREATED", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  =========== LIST GENDER =========== **/
    listGenders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Service:
                const resService = yield service.listGender();
                //Return:
                return res.status(200).json({ status: 200, msg: "OK", data: resService });
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  =========== EDIT GENDER =========== **/
    editGender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const id = req.params.id;
                const data = { name: req.body.name };
                //Service:
                const resService = yield service.editGender(id, data);
                //Return:
                if (resService === "GENDER_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else if (resService === "NAME_ALREADY_IN_USE" ||
                    resService === "INVALID_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else if (resService === "ERROR_EDIT") {
                    return res.status(500).json({ status: 500, msg: resService });
                }
                else {
                    return res
                        .status(201)
                        .json({ status: 201, msg: "GENDER_EDITED", data: resService });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
    /**  =========== DELETE GENDER =========== **/
    deleteGender(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //Data:
                const id = req.params.id;
                //Service:
                const resService = yield service.deleteGender(id);
                //Response:
                if (resService === "GENDER_NOT_FOUND") {
                    return res.status(404).json({ status: 404, msg: resService });
                }
                else if (resService === "INVALID_ID") {
                    return res.status(400).json({ status: 400, msg: resService });
                }
                else {
                    return res.status(200).json({ status: 200, msg: "GENDER_DELETED" });
                }
            }
            catch (e) {
                logger_1.logger.error(e.message);
                return res.status(500).json({ status: 500, msg: e.message, data: e });
            }
        });
    }
}
exports.default = genderController;
