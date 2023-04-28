"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gendersMock = exports.api = exports.dao = void 0;
const mongoose_1 = require("mongoose");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const genders_dao_1 = __importDefault(require("../../modules/Game/dao/genders.dao"));
//
// Dao:
exports.dao = new genders_dao_1.default();
//
//Supertest api:
exports.api = (0, supertest_1.default)(index_1.app);
//
//DATA MOCK:
exports.gendersMock = [
    { name: "action", _id: `${new mongoose_1.Types.ObjectId()}` },
    { name: "hack and slash", _id: `${new mongoose_1.Types.ObjectId()}` },
    { name: "horror", _id: `${new mongoose_1.Types.ObjectId()}` },
];
