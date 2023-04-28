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
const index_1 = require("../index");
const mongoose_1 = require("mongoose");
const platform_helpers_1 = require("./helpers/platform_helpers");
const company_helpers_1 = require("./helpers/company_helpers");
const gender_helpers_1 = require("./helpers/gender_helpers");
const game_helpers_1 = require("./helpers/game_helpers");
//
// BEFORE EACH:
(0, game_helpers_1.gameBeforeEach)();
describe("games GET method", () => {
    test("response returned as a json", () => __awaiter(void 0, void 0, void 0, function* () {
        yield game_helpers_1.api
            .get("/api/v1/game/list")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }));
    test("return games list", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.get("/api/v1/game/list");
        expect(response.body.data.games.length).toBeGreaterThanOrEqual(1);
    }));
    test("return game by ID", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.get(`/api/v1/game/list/id/${game_helpers_1.gamesMock[0]._id}`);
        expect(response.body.msg).toEqual("OK");
        expect(response.body.data.name).toEqual(game_helpers_1.gamesMock[0].name);
    }));
    test("return game by name", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.get(`/api/v1/game/list/name/${game_helpers_1.gamesMock[0].name}`);
        expect(response.body.msg).toEqual("OK");
    }));
    test("return game by company", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.get(`/api/v1/game/list/company/bethesda`);
        expect(response.body.msg).toEqual("OK");
    }));
    test("return game by platform", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.get(`/api/v1/game/list/platform/playstation_2`);
        expect(response.body.msg).toEqual("OK");
    }));
    test("return game by gender", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.get(`/api/v1/game/list/gender/horror`);
        expect(response.body.msg).toEqual("OK");
    }));
});
describe("games POST method", () => {
    test("create game: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("GAME_CREATED");
    }));
    test("create game: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `3asda2`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("create game: invalid gender id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id, "dasda3"],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("create game: invalid platform id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id, "dasda3"],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("create game: invalid company id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: "adasd",
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("create game: platform not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: `${company_helpers_1.companiesMock[0]._id}`,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [
                platform_helpers_1.platformMock[0]._id,
                platform_helpers_1.platformMock[1]._id,
                `${new mongoose_1.Types.ObjectId()}`,
            ],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
    }));
    test("create game: gender not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: `${company_helpers_1.companiesMock[0]._id}`,
            gender: [gender_helpers_1.gendersMock[0]._id, `${new mongoose_1.Types.ObjectId()}`],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
    }));
    test("create game: company not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            _id: `${new mongoose_1.Types.ObjectId()}`,
            name: "assasinss creed 3",
            release: "11/11/12",
            company: `${new mongoose_1.Types.ObjectId()}`,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.post("/api/v1/game/create").send(newGame);
        expect(response.body.msg).toEqual("COMPANY_NOT_FOUND");
    }));
});
describe("games PUT method", () => {
    test("edit game: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("GAME_EDITED");
    }));
    test("edit game: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api.put(`/api/v1/game/edit/adada`).send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("edit game: game not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${new mongoose_1.Types.ObjectId()}`)
            .send(newGame);
        expect(response.body.msg).toEqual("GAME_NOT_FOUND");
    }));
    test("edit game: invalid platform id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id, "dadasd"],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("edit game: invalid gender id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id, "dadasd"],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("edit game: invalid company id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: "dasdasd",
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
    test("edit game: no name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("edit game: company not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: `${new mongoose_1.Types.ObjectId()}`,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("COMPANY_NOT_FOUND");
    }));
    test("edit game: gender not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id, `${new mongoose_1.Types.ObjectId()}`],
            platform: [platform_helpers_1.platformMock[0]._id, platform_helpers_1.platformMock[1]._id],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
    }));
    test("edit game: platform not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGame = {
            name: "assasinss creed III",
            release: "11/11/12",
            company: company_helpers_1.companiesMock[0]._id,
            gender: [gender_helpers_1.gendersMock[0]._id],
            platform: [
                platform_helpers_1.platformMock[0]._id,
                platform_helpers_1.platformMock[1]._id,
                `${new mongoose_1.Types.ObjectId()}`,
            ],
            trailer: "https://youtu.be/YS8-Rd4NDdA",
        };
        const response = yield game_helpers_1.api
            .put(`/api/v1/game/edit/${game_helpers_1.gamesMock[0]._id}`)
            .send(newGame);
        expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
    }));
});
describe("game DELETE method", () => {
    test("delete game: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.delete(`/api/v1/game/delete/${game_helpers_1.gamesMock[0]._id}`);
        expect(response.body.msg).toEqual("GAME_DELETED");
    }));
    test("delete game: game not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.delete(`/api/v1/game/delete/${new mongoose_1.Types.ObjectId()}`);
        expect(response.body.msg).toEqual("GAME_NOT_FOUND");
    }));
    test("delete game: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield game_helpers_1.api.delete(`/api/v1/game/delete/sdasd`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
//
//
afterAll(() => {
    index_1.database.disconnect();
    index_1.server.close();
});
