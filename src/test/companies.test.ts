import { server, database } from "../index";
import { Types } from "mongoose";

//Helpers:
import { companiesMock, api, dao } from "./helpers/company_helpers";

beforeEach(async () => {
  await dao.deleteAll();
  await Promise.all(
    companiesMock.map(async (c) => {
      await dao.create(c);
    })
  );
});

describe("Company GET method", () => {
  /**  ============ TEST - RETURN A JSON ============  **/
  test("response returned as a json", async () => {
    await api
      .get("/api/v1/company/list")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  /**  ============ TEST - RETURN LIST OF COMPANIES ============  **/
  test("return list of companies", async () => {
    const response = await api.get("/api/v1/company/list");
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Company POST method", () => {
  /**  ============ TEST - CREATE A COMPANY ============  **/
  test("Create company: successfully", async () => {
    const newCompany = { name: "guerrilla", _id: `${new Types.ObjectId()}` };
    const response = await api.post("/api/v1/company/create").send(newCompany);
    expect(response.body.msg).toEqual("COMPANY_CREATED");
  });

  test("Create company: name in use", async () => {
    const newCompany = companiesMock[0];
    const response = await api.post("/api/v1/company/create").send(newCompany);
    expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
  });

  test("Create company: invalid body", async () => {
    const newCompany = { _id: `${new Types.ObjectId()}` };
    const response = await api.post("/api/v1/company/create").send(newCompany);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Create company: no name ", async () => {
    const newCompany = { name: "", _id: `${new Types.ObjectId()}` };
    const response = await api.post("/api/v1/company/create").send(newCompany);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Create company: name to long ", async () => {
    const newCompany = {
      name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
      _id: `${new Types.ObjectId()}`,
    };
    const response = await api.post("/api/v1/company/create").send(newCompany);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });
});

describe("Company PUT method", () => {
  /**  ============ TEST - EDIT A COMPANY ============  **/
  test("Edit company: Successfully", async () => {
    const data = { name: "zenimax" };
    const response = await api
      .put(`/api/v1/company/edit/${companiesMock[0]._id}`)
      .send(data);
    expect(response.body.msg).toEqual("EDITED");
  });

  test("Edit company: company not found", async () => {
    const data = { name: "zenimax" };
    const response = await api
      .put(`/api/v1/company/edit/${new Types.ObjectId()}`)
      .send(data);
    expect(response.body.msg).toEqual("COMPANY_NOT_FOUND");
  });

  test("Edit company: no name", async () => {
    const data = { name: "" };
    const response = await api
      .put(`/api/v1/company/edit/${companiesMock[0]._id}`)
      .send(data);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Edit company: name to long", async () => {
    const data = {
      name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
    };
    const response = await api
      .put(`/api/v1/company/edit/${companiesMock[0]._id}`)
      .send(data);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Edit company: name in use", async () => {
    const data = { name: companiesMock[1].name };
    const response = await api
      .put(`/api/v1/company/edit/${companiesMock[0]._id}`)
      .send(data);
    expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
  });
});

describe("Company DELETE method", () => {
  /**  ============ TEST - DELETE A COMPANY ============  **/
  test("delete a company", async () => {
    const response = await api.delete(
      `/api/v1/company/delete/${companiesMock[0]._id}`
    );
    expect(response.body.msg).toEqual("COMPANY_DELETED");
  });
});

afterAll(() => {
  database.disconnect();
  server.close();
});
