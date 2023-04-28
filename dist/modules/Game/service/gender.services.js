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
const genders_dao_1 = __importDefault(require("../dao/genders.dao"));
const mongoose_1 = require("mongoose");
const genderDAO = new genders_dao_1.default();
class genderService {
    /** =========== CREATE GENDER ===========**/
    createGender(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //check:
            const checkName = yield genderDAO.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //Create:
            const newGender = yield genderDAO.create(data);
            if (!newGender) {
                return "ERROR_CREATE";
            }
            else {
                return newGender._id;
            }
        });
    }
    /** =========== LIST GENDER =========== **/
    listGender() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield genderDAO.getAll();
        });
    }
    /**  =========== EDIT GENDER =========== **/
    editGender(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate id:
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return "INVALID_ID";
            }
            //check if exists:
            const checkGender = yield genderDAO.getOneByID(id);
            if (!checkGender) {
                return "GENDER_NOT_FOUND";
            }
            //check name:
            const checkName = yield genderDAO.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //Edit:
            const editedGender = yield genderDAO.edit(id, data);
            if (!editedGender) {
                return "ERROR_EDIT";
            }
            else {
                return editedGender._id;
            }
        });
    }
    /**  =========== DELETE GENDER =========== **/
    deleteGender(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //validate id:
            if (!(0, mongoose_1.isValidObjectId)(id)) {
                return "INVALID_ID";
            }
            //check:
            const checkGender = yield genderDAO.getOneByID(id);
            if (!checkGender) {
                return "GENDER_NOT_FOUND";
            }
            //Delete:
            return yield genderDAO.delete(id);
        });
    }
}
exports.default = genderService;
