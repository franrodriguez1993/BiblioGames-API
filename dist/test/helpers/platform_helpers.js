"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.platformMock = exports.dao = exports.api = void 0;
const mongoose_1 = require("mongoose");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const platforms_dao_1 = __importDefault(require("../../modules/Game/dao/platforms.dao"));
exports.api = (0, supertest_1.default)(index_1.app);
exports.dao = new platforms_dao_1.default();
exports.platformMock = [
    { name: "playstation 1", _id: `${new mongoose_1.Types.ObjectId()}` },
    { name: "playstation 2", _id: `${new mongoose_1.Types.ObjectId()}` },
    { name: "playstation 3", _id: `${new mongoose_1.Types.ObjectId()}` },
];
