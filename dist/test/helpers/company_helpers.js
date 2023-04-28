"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.companiesMock = exports.api = exports.dao = void 0;
const mongoose_1 = require("mongoose");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const companies_dao_1 = __importDefault(require("../../modules/Game/dao/companies.dao"));
//
//Dao:
exports.dao = new companies_dao_1.default();
//
//Supertest api:
exports.api = (0, supertest_1.default)(index_1.app);
//
//DATA MOCK:
exports.companiesMock = [
    { name: "bethesda", _id: `${new mongoose_1.Types.ObjectId()}` },
    { name: "electronic arts", _id: `${new mongoose_1.Types.ObjectId()}` },
    { name: "activition", _id: `${new mongoose_1.Types.ObjectId()}` },
];
