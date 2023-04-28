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
exports.database = exports.server = exports.app = void 0;
require("dotenv/config");
const MongoDBClass_1 = __importDefault(require("./config/MongoDBClass"));
const configServer_1 = __importDefault(require("./config/configServer"));
const logger_1 = require("./helpers/logger");
const app_1 = __importDefault(require("./app"));
exports.app = app_1.default;
const PORT = configServer_1.default.server.port;
const MODE = configServer_1.default.server.mode;
const URL_API = configServer_1.default.server.urlApi;
const database = new MongoDBClass_1.default();
exports.database = database;
const server = app_1.default.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield database.connect();
    MODE === "development" || MODE === "test"
        ? logger_1.logger.info(`Server up in ${URL_API}${PORT} - MODE: development`)
        : logger_1.logger.info(`Server up in ${URL_API} - MODE: Production`);
}));
exports.server = server;
