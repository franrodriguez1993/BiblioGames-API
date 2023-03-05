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
exports.listGamesByName = exports.listGamesByPlatform = exports.listGamesByGender = exports.listGamesByCompany = exports.listGames = void 0;
//import Daos:
const games_dao_1 = __importDefault(require("../modules/Game/dao/games.dao"));
const companies_dao_1 = __importDefault(require("../modules/Game/dao/companies.dao"));
const genders_dao_1 = __importDefault(require("../modules/Game/dao/genders.dao"));
const platforms_dao_1 = __importDefault(require("../modules/Game/dao/platforms.dao"));
//Instance Daos:
const gamesDao = new games_dao_1.default();
const companyDao = new companies_dao_1.default();
const genderDao = new genders_dao_1.default();
const platformDao = new platforms_dao_1.default();
/**  QUERIES:  **/
//list games:
function listGames(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return yield gamesDao.listGames(data.page, data.limit);
        }
        catch (e) {
            return { status: 500, msg: e.message };
        }
    });
}
exports.listGames = listGames;
//list by company:
function listGamesByCompany(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nameCompany = data.name.split("_").join(" ");
            const company = yield companyDao.getOneByName(nameCompany);
            if (!company)
                return { status: 404, msg: "COMPANY_NOT_FOUND" };
            return yield gamesDao.listByCompany(company._id, data.page, data.limit);
        }
        catch (e) {
            return { status: 500, msg: e.message };
        }
    });
}
exports.listGamesByCompany = listGamesByCompany;
//list by gender:
function listGamesByGender(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nameGender = data.name.split("_").join(" ");
            const gender = yield genderDao.getOneByName(nameGender);
            if (!gender)
                return { status: 404, msg: "GENDER_NOT_FOUND" };
            return yield gamesDao.listByGender(gender._id, data.page, data.limit);
        }
        catch (e) {
            return { status: 500, msg: e.message };
        }
    });
}
exports.listGamesByGender = listGamesByGender;
//list by platform:
function listGamesByPlatform(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const namePlatform = data.name.split("_").join(" ");
            const platform = yield platformDao.getOneByName(namePlatform);
            if (!platform)
                return { status: 404, msg: "PLATFORM_NOT_FOUND" };
            return yield gamesDao.listByPlatform(platform._id, data.page, data.limit);
        }
        catch (e) {
            return { status: 500, msg: e.message };
        }
    });
}
exports.listGamesByPlatform = listGamesByPlatform;
//list by name:
function listGamesByName(data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const nameGame = data.name.split("_").join(" ");
            return yield gamesDao.listByName(nameGame, data.page, data.limit);
        }
        catch (e) {
            return { status: 500, msg: e.message };
        }
    });
}
exports.listGamesByName = listGamesByName;
