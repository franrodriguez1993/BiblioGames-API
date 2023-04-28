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
//Helpers:
const platform_helpers_1 = require("./helpers/platform_helpers");
//
//
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield platform_helpers_1.dao.deleteAll();
    Promise.all(platform_helpers_1.platformMock.map((p) => __awaiter(void 0, void 0, void 0, function* () {
        yield platform_helpers_1.dao.create(p);
    })));
}));
describe("platforms GET method", () => {
    test("response returned as a json", () => __awaiter(void 0, void 0, void 0, function* () {
        yield platform_helpers_1.api
            .get("/api/v1/platform/list")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }));
    test("return platform list", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield platform_helpers_1.api.get("/api/v1/platform/list");
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    }));
});
describe("platforms POST method", () => {
    test("create platform: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = { name: "xbox one", _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield platform_helpers_1.api
            .post("/api/v1/platform/create")
            .send(newPlatform);
        expect(response.body.msg).toEqual("PLATFORM_CREATED");
    }));
    test("create platform: no name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = { name: "", _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield platform_helpers_1.api
            .post("/api/v1/platform/create")
            .send(newPlatform);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("create platform: name to long", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = {
            name: "esternocleidomastoideodreamcatcherlinkinparkevanescenceskilletnickel",
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield platform_helpers_1.api
            .post("/api/v1/platform/create")
            .send(newPlatform);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("create platform: name in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = {
            name: platform_helpers_1.platformMock[0].name,
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield platform_helpers_1.api
            .post("/api/v1/platform/create")
            .send(newPlatform);
        expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
    }));
});
describe("platform PUT method", () => {
    test("edit platform: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = { name: "playstation one", _id: platform_helpers_1.platformMock[0]._id };
        const response = yield platform_helpers_1.api
            .put(`/api/v1/platform/edit/${newPlatform._id}`)
            .send(newPlatform);
        expect(response.body.msg).toEqual("PLATFORM_EDITED");
    }));
    test("edit platform: no name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = { name: "", _id: platform_helpers_1.platformMock[0]._id };
        const response = yield platform_helpers_1.api
            .put(`/api/v1/platform/edit/${newPlatform._id}`)
            .send(newPlatform);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("edit platform: name to long", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = {
            name: "esternocleidomastoideodreamcatcherlinkinparkevanescenceskilletnickel",
            _id: platform_helpers_1.platformMock[0]._id,
        };
        const response = yield platform_helpers_1.api
            .put(`/api/v1/platform/edit/${newPlatform._id}`)
            .send(newPlatform);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("edit platform: platform not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = {
            name: "playstation one",
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield platform_helpers_1.api
            .put(`/api/v1/platform/edit/${newPlatform._id}`)
            .send(newPlatform);
        expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
    }));
    test("edit platform: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const newPlatform = {
            name: "playstation one",
            _id: `SDADaa`,
        };
        const response = yield platform_helpers_1.api
            .put(`/api/v1/platform/edit/${newPlatform._id}`)
            .send(newPlatform);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
describe("platform delete", () => {
    test("platform delete: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield platform_helpers_1.api.delete(`/api/v1/platform/delete/${platform_helpers_1.platformMock[0]._id}`);
        expect(response.body.msg).toEqual("PLATFORM_DELETED");
    }));
    test("platform delete: platform not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield platform_helpers_1.api.delete(`/api/v1/platform/delete/${new mongoose_1.Types.ObjectId()}`);
        expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
    }));
    test("platform delete: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield platform_helpers_1.api.delete(`/api/v1/platform/delete/ASDA2`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
//
//
afterAll(() => {
    index_1.database.disconnect();
    index_1.server.close();
});
