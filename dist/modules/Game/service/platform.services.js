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
const platforms_dao_1 = __importDefault(require("../dao/platforms.dao"));
const platformDAO = new platforms_dao_1.default();
class platformService {
    /** =========== CREATE PLATFORM ===========**/
    createPlatform(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //check:
            const checkName = yield platformDAO.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //Create:
            const newPlatform = yield platformDAO.create(data);
            if (!newPlatform) {
                return "ERROR_CREATE";
            }
            else {
                return newPlatform._id;
            }
        });
    }
    /** =========== LIST PLATFORM =========== **/
    listPlatform() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield platformDAO.getAll();
        });
    }
    /**  =========== EDIT PLATFORM =========== **/
    editPlatform(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if exists:
            const checkPlatform = yield platformDAO.getOneByID(id);
            if (!checkPlatform) {
                return "PLATFORM_NOT_FOUND";
            }
            //check name:
            const checkName = yield platformDAO.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //Edit:
            const editedPlatform = yield platformDAO.edit(id, data);
            if (!editedPlatform) {
                return "ERROR_EDIT";
            }
            else {
                return editedPlatform._id;
            }
        });
    }
    /**  =========== DELETE PLATFORM =========== **/
    deletePlatform(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //check:
            const checkPlatform = yield platformDAO.getOneByID(id);
            if (!checkPlatform) {
                return "PLATFORM_NOT_FOUND";
            }
            //Delete:
            return yield platformDAO.delete(id);
        });
    }
}
exports.default = platformService;
