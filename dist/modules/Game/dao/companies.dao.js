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
const mongoContainer_1 = __importDefault(require("../../../containers/mongoContainer"));
const companies_model_1 = __importDefault(require("../model/companies.model"));
const logger_1 = require("../../../helpers/logger");
class daoCompanies extends mongoContainer_1.default {
    constructor() {
        super(companies_model_1.default);
    }
    /** CREATE **/
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.create(data);
            }
            catch (e) {
                logger_1.logger.error(e.message);
                throw new Error(e);
            }
        });
    }
    /**  EDIT   **/
    edit(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndUpdate({ _id: id }, data);
            }
            catch (e) {
                logger_1.logger.error(e.message);
                throw new Error(e);
            }
        });
    }
}
exports.default = daoCompanies;
