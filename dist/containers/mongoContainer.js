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
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../helpers/logger");
class mongoContainer {
    constructor(model) {
        this.model = model;
    }
    /**  LIST  **/
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.find({});
            }
            catch (e) {
                logger_1.logger.error(e.message);
                throw new Error(e);
            }
        });
    }
    /**  GET BY ID  **/
    getOneByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ _id: id });
            }
            catch (e) {
                logger_1.logger.error(e.message);
                throw new Error(e);
            }
        });
    }
    /**  GET BY NAME  **/
    getOneByName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ name });
            }
            catch (e) {
                logger_1.logger.error(e.message);
                throw new Error(e);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOneAndDelete({ _id: id });
            }
            catch (e) {
                logger_1.logger.info(e.message);
                throw new Error(e);
            }
        });
    }
}
exports.default = mongoContainer;
