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
const games_dao_1 = __importDefault(require("../dao/games.dao"));
const companies_dao_1 = __importDefault(require("../dao/companies.dao"));
const platforms_dao_1 = __importDefault(require("../dao/platforms.dao"));
const genders_dao_1 = __importDefault(require("../dao/genders.dao"));
//Image uploader:
const imageKitClass_1 = __importDefault(require("../../../helpers/imageKitClass"));
const mongoose_1 = require("mongoose");
const gamesDao = new games_dao_1.default();
const companyDao = new companies_dao_1.default();
const platformDao = new platforms_dao_1.default();
const genderDao = new genders_dao_1.default();
const uploaderManager = new imageKitClass_1.default();
class gameService {
    /**  CREATE GAME  **/
    createGame(data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Validate game id:
            if (data._id) {
                if (!(0, mongoose_1.isValidObjectId)(data._id.toString()))
                    return "INVALID_ID";
            }
            //validate gender id:
            if (data.gender.map((g) => (0, mongoose_1.isValidObjectId)(g)).some((x) => x === false)) {
                return "INVALID_ID";
            }
            // validate platforms id:
            if (data.platform.map((p) => (0, mongoose_1.isValidObjectId)(p)).some((x) => x === false)) {
                return "INVALID_ID";
            }
            // validate company id:
            if (!(0, mongoose_1.isValidObjectId)(data.company))
                return "INVALID_ID";
            //check name:
            const checkName = yield gamesDao.getOneByName(data.name);
            if (checkName) {
                return "NAME_ALREADY_IN_USE";
            }
            //check platforms:
            const platformsArray = yield Promise.all(data.platform.map((p) => __awaiter(this, void 0, void 0, function* () {
                const check = yield platformDao.getOneByID(p);
                return check ? true : false;
            })));
            if (platformsArray.some((p) => p === false))
                return "PLATFORM_NOT_FOUND";
            //check gender:
            const genderArray = yield Promise.all(data.gender.map((g) => __awaiter(this, void 0, void 0, function* () {
                const check = yield genderDao.getOneByID(g);
                return check ? true : false;
            })));
            if (genderArray.some((g) => g === false))
                return "GENDER_NOT_FOUND";
            //check company:
            const company = yield companyDao.getOneByID(data.company);
            if (!company)
                return "COMPANY_NOT_FOUND";
            //Create:
            const newGame = yield gamesDao.createGame(data);
            if (!newGame) {
                return "ERROR_CREATE";
            }
            else {
                return newGame._id;
            }
        });
    }
    /**  LIST GAME  **/
    listGames(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield gamesDao.listGames(page, limit);
        });
    }
    /**  UPLOAD GAME IMAGE **/
    uploadGameImage(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Check game:
            const checkGame = yield gamesDao.getOneByID(id);
            if (!checkGame) {
                return "GAME_NOT_FOUND";
            }
            const imageData = yield uploaderManager.uploadImage(data);
            //Check path:
            if (!imageData)
                return "INVALID_PATH";
            //Edite game:
            const urlImg = imageData.url;
            const editedGame = yield gamesDao.updateGameImage(id, urlImg);
            if (!editedGame) {
                return "ERROR_EDIT";
            }
            else {
                return editedGame._id;
            }
        });
    }
    /**  EDIT GAME **/
    editGame(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            //Validate game id:
            if (!(0, mongoose_1.isValidObjectId)(id.toString()))
                return "INVALID_ID";
            //validate gender id:
            if (data.gender.map((g) => (0, mongoose_1.isValidObjectId)(g)).some((x) => x === false)) {
                return "INVALID_ID";
            }
            // validate platforms id:
            if (data.platform.map((p) => (0, mongoose_1.isValidObjectId)(p)).some((x) => x === false)) {
                return "INVALID_ID";
            }
            // validate company id:
            if (!(0, mongoose_1.isValidObjectId)(data.company))
                return "INVALID_ID";
            //check platforms:
            const platformsArray = yield Promise.all(data.platform.map((p) => __awaiter(this, void 0, void 0, function* () {
                const check = yield platformDao.getOneByID(p);
                return check ? true : false;
            })));
            if (platformsArray.some((p) => p === false))
                return "PLATFORM_NOT_FOUND";
            //check gender:
            const genderArray = yield Promise.all(data.gender.map((g) => __awaiter(this, void 0, void 0, function* () {
                const check = yield genderDao.getOneByID(g);
                return check ? true : false;
            })));
            if (genderArray.some((g) => g === false))
                return "GENDER_NOT_FOUND";
            //check company:
            const company = yield companyDao.getOneByID(data.company);
            if (!company)
                return "COMPANY_NOT_FOUND";
            //check game:
            const checkGame = yield gamesDao.getOneByID(id);
            if (!checkGame)
                return "GAME_NOT_FOUND";
            //Edit:
            const editedGame = yield gamesDao.editGame(id, data);
            if (!editedGame) {
                return "ERROR_EDIT";
            }
            else {
                return editedGame._id;
            }
        });
    }
    /**  DELETE GAME **/
    deleteGame(id) {
        return __awaiter(this, void 0, void 0, function* () {
            //Validate game id:
            if (!(0, mongoose_1.isValidObjectId)(id.toString()))
                return "INVALID_ID";
            //check game:
            const check = yield gamesDao.getOneByID(id);
            if (!check)
                return "GAME_NOT_FOUND";
            //delete:
            return yield gamesDao.delete(id);
        });
    }
    /**  LIST GAME BY COMPANY **/
    listByCompany(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetedName = name.split("_").join(" ");
            const company = yield companyDao.getOneByName(resetedName);
            if (!company)
                return "COMPANY_NOT_FOUND";
            return yield gamesDao.listByCompany(company._id, page, limit);
        });
    }
    /**   LIST GAMES BY PLATFORM   **/
    listByPlatform(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetedName = name.split("_").join(" ");
            const platform = yield platformDao.getOneByName(resetedName);
            if (!platform)
                return "PLATFORM_NOT_FOUND";
            return yield gamesDao.listByPlatform(platform._id, page, limit);
        });
    }
    /**   LIST GAMES BY GENDER   **/
    listByGender(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetedName = name.split("_").join(" ");
            const gender = yield genderDao.getOneByName(resetedName);
            if (!gender)
                return "GENDER_NOT_FOUND";
            return yield gamesDao.listByGender(gender._id, page, limit);
        });
    }
    /**   LIST GAMES BY NAME  **/
    listByName(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            const resetedName = name.split("_").join(" ");
            return yield gamesDao.listByName(resetedName, page, limit);
        });
    }
    /**   LIST GAMES BY ID   **/
    listByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield gamesDao.listByID(id);
            if (!data)
                return "GAME_NOT_FOUND";
            else
                return data;
        });
    }
}
exports.default = gameService;
