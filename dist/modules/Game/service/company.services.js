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
//Dao:
const companies_dao_1 = __importDefault(require("../dao/companies.dao"));
const dao = new companies_dao_1.default();
class companyService {
    /** CREATE COMPANY  **/
    createCompany(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check:
            const checkName = yield dao.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //Create:
            const newCompany = yield dao.create(data);
            if (!newCompany) {
                return "ERROR_CREATE";
            }
            else {
                return newCompany._id;
            }
        });
    }
    /** LIST COMPANIES  **/
    listCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield dao.getAll();
        });
    }
    /** EDIT COMPANIES  **/
    editCompany(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //check if exists:
            const checkCompany = yield dao.getOneByID(id);
            if (!checkCompany) {
                return "COMPANY_NOT_FOUND";
            }
            //check name:
            const checkName = yield dao.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //edit:
            const editedCompany = yield dao.edit(id, data);
            if (!editedCompany) {
                return "ERROR_EDIT";
            }
            else {
                return editedCompany._id;
            }
        });
    }
    /** DELETE COMPANIES  **/
    deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //check:
            const check = yield dao.getOneByID(id);
            if (!check) {
                return "COMPANY_NOT_FOUND";
            }
            return yield dao.delete(id);
        });
    }
}
exports.default = companyService;
