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
exports.gameBeforeEach = exports.gamesMock = exports.daoGamesMock = exports.api = void 0;
const mongoose_1 = require("mongoose");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../../index");
const games_dao_1 = __importDefault(require("../../modules/Game/dao/games.dao"));
//mock helpers:
const platform_helpers_1 = require("./platform_helpers");
const company_helpers_1 = require("./company_helpers");
const gender_helpers_1 = require("./gender_helpers");
exports.api = (0, supertest_1.default)(index_1.app);
exports.daoGamesMock = new games_dao_1.default();
exports.gamesMock = [
    {
        _id: `${new mongoose_1.Types.ObjectId()}`,
        name: "assassins creed",
        release: "02/07/07",
        company: `${company_helpers_1.companiesMock[0]._id}`,
        platform: [
            `${platform_helpers_1.platformMock[0]._id}`,
            `${platform_helpers_1.platformMock[1]._id}`,
            `${platform_helpers_1.platformMock[2]._id}`,
        ],
        gender: [`${gender_helpers_1.gendersMock[0]._id}`, `${platform_helpers_1.platformMock[1]._id}`],
        trailer: "https://youtu.be/RjQ6ZtyXoA0",
    },
    {
        _id: `${new mongoose_1.Types.ObjectId()}`,
        name: "assassins creed 2",
        release: "02/07/09",
        company: `${company_helpers_1.companiesMock[0]._id}`,
        platform: [
            `${platform_helpers_1.platformMock[0]._id}`,
            `${platform_helpers_1.platformMock[1]._id}`,
            `${platform_helpers_1.platformMock[2]._id}`,
        ],
        gender: [`${gender_helpers_1.gendersMock[0]._id}`, `${platform_helpers_1.platformMock[1]._id}`],
        trailer: "https://youtu.be/_xkCPNECud8",
    },
];
// beforeAll
const gameBeforeEach = () => {
    beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
        yield platform_helpers_1.dao.deleteAll();
        yield company_helpers_1.dao.deleteAll();
        yield gender_helpers_1.dao.deleteAll();
        yield exports.daoGamesMock.deleteAll();
        yield Promise.all(platform_helpers_1.platformMock.map((p) => __awaiter(void 0, void 0, void 0, function* () {
            yield platform_helpers_1.dao.create(p);
        })));
        yield Promise.all(gender_helpers_1.gendersMock.map((g) => __awaiter(void 0, void 0, void 0, function* () {
            yield gender_helpers_1.dao.create(g);
        })));
        yield Promise.all(company_helpers_1.companiesMock.map((c) => __awaiter(void 0, void 0, void 0, function* () {
            yield company_helpers_1.dao.create(c);
        })));
        yield Promise.all(exports.gamesMock.map((g) => __awaiter(void 0, void 0, void 0, function* () {
            yield exports.daoGamesMock.createGame(g);
        })));
    }));
};
exports.gameBeforeEach = gameBeforeEach;
