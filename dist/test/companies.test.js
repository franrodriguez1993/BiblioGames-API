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
const company_helpers_1 = require("./helpers/company_helpers");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield company_helpers_1.dao.deleteAll();
    yield Promise.all(company_helpers_1.companiesMock.map((c) => __awaiter(void 0, void 0, void 0, function* () {
        yield company_helpers_1.dao.create(c);
    })));
}));
describe("Company GET method", () => {
    /**  ============ TEST - RETURN A JSON ============  **/
    test("response returned as a json", () => __awaiter(void 0, void 0, void 0, function* () {
        yield company_helpers_1.api
            .get("/api/v1/company/list")
            .expect(200)
            .expect("Content-Type", /application\/json/);
    }));
    /**  ============ TEST - RETURN LIST OF COMPANIES ============  **/
    test("return list of companies", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield company_helpers_1.api.get("/api/v1/company/list");
        expect(response.body.data.length).toBeGreaterThanOrEqual(1);
    }));
});
describe("Company POST method", () => {
    /**  ============ TEST - CREATE A COMPANY ============  **/
    test("Create company: successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCompany = { name: "guerrilla", _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield company_helpers_1.api.post("/api/v1/company/create").send(newCompany);
        expect(response.body.msg).toEqual("COMPANY_CREATED");
    }));
    test("Create company: name in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCompany = company_helpers_1.companiesMock[0];
        const response = yield company_helpers_1.api.post("/api/v1/company/create").send(newCompany);
        expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
    }));
    test("Create company: invalid body", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCompany = { _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield company_helpers_1.api.post("/api/v1/company/create").send(newCompany);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Create company: no name ", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCompany = { name: "", _id: `${new mongoose_1.Types.ObjectId()}` };
        const response = yield company_helpers_1.api.post("/api/v1/company/create").send(newCompany);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Create company: name to long ", () => __awaiter(void 0, void 0, void 0, function* () {
        const newCompany = {
            name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
            _id: `${new mongoose_1.Types.ObjectId()}`,
        };
        const response = yield company_helpers_1.api.post("/api/v1/company/create").send(newCompany);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
});
describe("Company PUT method", () => {
    /**  ============ TEST - EDIT A COMPANY ============  **/
    test("Edit company: Successfully", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: "zenimax" };
        const response = yield company_helpers_1.api
            .put(`/api/v1/company/edit/${company_helpers_1.companiesMock[0]._id}`)
            .send(data);
        expect(response.body.msg).toEqual("EDITED");
    }));
    test("Edit company: company not found", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: "zenimax" };
        const response = yield company_helpers_1.api
            .put(`/api/v1/company/edit/${new mongoose_1.Types.ObjectId()}`)
            .send(data);
        expect(response.body.msg).toEqual("COMPANY_NOT_FOUND");
    }));
    test("Edit company: no name", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: "" };
        const response = yield company_helpers_1.api
            .put(`/api/v1/company/edit/${company_helpers_1.companiesMock[0]._id}`)
            .send(data);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Edit company: name to long", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = {
            name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
        };
        const response = yield company_helpers_1.api
            .put(`/api/v1/company/edit/${company_helpers_1.companiesMock[0]._id}`)
            .send(data);
        expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
    }));
    test("Edit company: name in use", () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { name: company_helpers_1.companiesMock[1].name };
        const response = yield company_helpers_1.api
            .put(`/api/v1/company/edit/${company_helpers_1.companiesMock[0]._id}`)
            .send(data);
        expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
    }));
});
describe("Company DELETE method", () => {
    /**  ============ TEST - DELETE A COMPANY ============  **/
    test("delete a company", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield company_helpers_1.api.delete(`/api/v1/company/delete/${company_helpers_1.companiesMock[0]._id}`);
        expect(response.body.msg).toEqual("COMPANY_DELETED");
    }));
});
afterAll(() => {
    index_1.database.disconnect();
    index_1.server.close();
});
