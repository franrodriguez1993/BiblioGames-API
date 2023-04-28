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
const gender_helpers_1 = require("./helpers/gender_helpers");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield gender_helpers_1.dao.deleteAll();
    yield Promise.all(gender_helpers_1.gendersMock.map((g) => __awaiter(void 0, void 0, void 0, function* () {
        yield gender_helpers_1.dao.create(g);
    })));
}));
describe("Genders GET method", () => {
    test("response returned as a json", () => __awaiter(void 0, void 0, void 0, function* () {
        yield gender_helpers_1.api
            .get("/api/v1/company/list")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }));
    test("list of genders", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield gender_helpers_1.api.get("/api/v1/gender/list");
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    }));
});
describe("Genders POST method", () => {
    test("Create gender: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGender = { name: "adventure", _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield gender_helpers_1.api.post("/api/v1/gender/create").send(newGender);
        expect(response.body.msg).toEqual("GENDER_CREATED");
    }));
    test("Create gender: no name", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGender = { name: "", _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield gender_helpers_1.api.post("/api/v1/gender/create").send(newGender);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Create gender: name to long", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGender = {
            name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield gender_helpers_1.api.post("/api/v1/gender/create").send(newGender);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Create gender: name in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const newGender = {
            name: gender_helpers_1.gendersMock[0].name,
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield gender_helpers_1.api.post("/api/v1/gender/create").send(newGender);
        expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
    }));
});
describe("Genders PUT method", () => {
    test("Edit gender: updated successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const gender = { name: "survival", _id: `${gender_helpers_1.gendersMock[0]._id}` };
        const response = yield gender_helpers_1.api
            .put(`/api/v1/gender/edit/${gender._id}`)
            .send(gender);
        expect(response.body.msg).toEqual("GENDER_EDITED");
    }));
    test("Edit gender: no name", () => __awaiter(void 0, void 0, void 0, function* () {
        const gender = { name: "", _id: `${gender_helpers_1.gendersMock[0]._id}` };
        const response = yield gender_helpers_1.api
            .put(`/api/v1/gender/edit/${gender._id}`)
            .send(gender);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Edit gender: name to long", () => __awaiter(void 0, void 0, void 0, function* () {
        const gender = {
            name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
            _id: `${gender_helpers_1.gendersMock[0]._id}`,
        };
        const response = yield gender_helpers_1.api
            .put(`/api/v1/gender/edit/${gender._id}`)
            .send(gender);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Edit gender: gender not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const gender = {
            name: "survival",
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield gender_helpers_1.api
            .put(`/api/v1/gender/edit/${gender._id}`)
            .send(gender);
        expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
    }));
    test("Edit gender: name in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const gender = {
            name: gender_helpers_1.gendersMock[1].name,
            _id: `${gender_helpers_1.gendersMock[0]._id}`,
        };
        const response = yield gender_helpers_1.api
            .put(`/api/v1/gender/edit/${gender._id}`)
            .send(gender);
        expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
    }));
    test("Edit gender: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const gender = {
            name: gender_helpers_1.gendersMock[1].name,
            _id: `324sdfsdf`,
        };
        const response = yield gender_helpers_1.api
            .put(`/api/v1/gender/edit/${gender._id}`)
            .send(gender);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
describe("Genders DELETE method", () => {
    test("gender delete successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield gender_helpers_1.api.delete(`/api/v1/gender/delete/${gender_helpers_1.gendersMock[0]._id}`);
        expect(response.body.msg).toEqual("GENDER_DELETED");
    }));
    test("gender delete: gender not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield gender_helpers_1.api.delete(`/api/v1/gender/delete/${new mongoose_1.Types.ObjectId()}`);
        expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
    }));
    test("gender delete: invalid id", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield gender_helpers_1.api.delete(`/api/v1/gender/delete/qweqweqe2`);
        expect(response.body.msg).toEqual("INVALID_ID");
    }));
});
//
//
afterAll(() => {
    index_1.database.disconnect();
    index_1.server.close();
});
