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
const games_model_1 = __importDefault(require("../model/games.model"));
const PaginationData_1 = __importDefault(require("../../../helpers/PaginationData"));
class daoGames extends mongoContainer_1.default {
    constructor() {
        super(games_model_1.default);
    }
    /**   CREATE GAME   **/
    createGame(data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.create(data);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   LIST GAMES   **/
    listGames(page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model
                    .find({})
                    .populate([
                    { path: "gender", model: "genders" },
                    { path: "platform", model: "platforms" },
                    { path: "company", model: "companies" },
                ])
                    .skip((page - 1) * limit)
                    .limit(limit);
                //count the document's length
                const count = yield this.model.countDocuments();
                //Return paginated data:
                return (0, PaginationData_1.default)(data, page, limit, count, "games");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   UPDATE GAME IMAGE   **/
    updateGameImage(id, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield this.model.findOne({ _id: id });
                game.image = path;
                return yield game.save();
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   EDIT GAME   **/
    editGame(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findByIdAndUpdate({ _id: id }, data);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   LIST GAMES BY COMPANY   **/
    listByCompany(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model
                    .find({ company: id })
                    .populate([
                    { path: "gender", model: "genders" },
                    { path: "platform", model: "platforms" },
                    { path: "company", model: "companies" },
                ])
                    .skip((page - 1) * limit)
                    .limit(limit);
                //count the document's length:
                const count = yield this.model.countDocuments({ company: id });
                //Return paginated data:
                return (0, PaginationData_1.default)(data, page, limit, count, "games");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   LIST GAMES BY PLATFORM   **/
    listByPlatform(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model
                    .find({ platform: id })
                    .populate([
                    { path: "gender", model: "genders" },
                    { path: "platform", model: "platforms" },
                    { path: "company", model: "companies" },
                ])
                    .skip((page - 1) * limit)
                    .limit(limit);
                const count = yield this.model.countDocuments({ platform: id });
                //Return paginated data:
                return (0, PaginationData_1.default)(data, page, limit, count, "games");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   LIST GAMES BY GENDER   **/
    listByGender(id, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model
                    .find({ gender: id })
                    .populate([
                    { path: "gender", model: "genders" },
                    { path: "platform", model: "platforms" },
                    { path: "company", model: "companies" },
                ])
                    .skip((page - 1) * limit)
                    .limit(limit);
                const count = yield this.model.countDocuments({ gender: id });
                //Return paginated data:
                return (0, PaginationData_1.default)(data, page, limit, count, "games");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   LIST GAMES BY NAME    **/
    listByName(name, page, limit) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const data = yield this.model
                    .find({ name: { $regex: name, $options: "i" } })
                    .populate([
                    { path: "gender", model: "genders" },
                    { path: "platform", model: "platforms" },
                    { path: "company", model: "companies" },
                ])
                    .skip((page - 1) * limit)
                    .limit(limit);
                const count = yield this.model.countDocuments({
                    name: { $regex: name, $options: "i" },
                });
                //Return paginated data:
                return (0, PaginationData_1.default)(data, page, limit, count, "games");
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    /**   LIST GAMES BY ID   **/
    listByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.model.findOne({ _id: id }).populate([
                    { path: "gender", model: "genders" },
                    { path: "platform", model: "platforms" },
                    { path: "company", model: "companies" },
                ]);
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
}
exports.default = daoGames;
