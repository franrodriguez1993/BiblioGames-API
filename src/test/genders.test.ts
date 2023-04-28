import { server, database } from "../index";
import { Types } from "mongoose";

//Helpers:
import { gendersMock, api, dao } from "./helpers/gender_helpers";

beforeEach(async () => {
  await dao.deleteAll();
  await Promise.all(
    gendersMock.map(async (g) => {
      await dao.create(g);
    })
  );
});

describe("Genders GET method", () => {
  test("response returned as a json", async () => {
    await api
      .get("/api/v1/company/list")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("list of genders", async () => {
    const response = await api.get("/api/v1/gender/list");
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("Genders POST method", () => {
  test("Create gender: successfully", async () => {
    const newGender = { name: "adventure", _id: `${new Types.ObjectId()}` };
    const response = await api.post("/api/v1/gender/create").send(newGender);
    expect(response.body.msg).toEqual("GENDER_CREATED");
  });

  test("Create gender: no name", async () => {
    const newGender = { name: "", _id: `${new Types.ObjectId()}` };
    const response = await api.post("/api/v1/gender/create").send(newGender);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Create gender: name to long", async () => {
    const newGender = {
      name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
      _id: `${new Types.ObjectId()}`,
    };
    const response = await api.post("/api/v1/gender/create").send(newGender);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Create gender: name in use", async () => {
    const newGender = {
      name: gendersMock[0].name,
      _id: `${new Types.ObjectId()}`,
    };
    const response = await api.post("/api/v1/gender/create").send(newGender);
    expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
  });
});

describe("Genders PUT method", () => {
  test("Edit gender: updated successfully", async () => {
    const gender = { name: "survival", _id: `${gendersMock[0]._id}` };

    const response = await api
      .put(`/api/v1/gender/edit/${gender._id}`)
      .send(gender);

    expect(response.body.msg).toEqual("GENDER_EDITED");
  });

  test("Edit gender: no name", async () => {
    const gender = { name: "", _id: `${gendersMock[0]._id}` };

    const response = await api
      .put(`/api/v1/gender/edit/${gender._id}`)
      .send(gender);

    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Edit gender: name to long", async () => {
    const gender = {
      name: "esternocreidomastoideohellomydarlinghellodarkessmyoldfriend",
      _id: `${gendersMock[0]._id}`,
    };

    const response = await api
      .put(`/api/v1/gender/edit/${gender._id}`)
      .send(gender);

    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("Edit gender: gender not found", async () => {
    const gender = {
      name: "survival",
      _id: `${new Types.ObjectId()}`,
    };

    const response = await api
      .put(`/api/v1/gender/edit/${gender._id}`)
      .send(gender);

    expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
  });

  test("Edit gender: name in use", async () => {
    const gender = {
      name: gendersMock[1].name,
      _id: `${gendersMock[0]._id}`,
    };
    const response = await api
      .put(`/api/v1/gender/edit/${gender._id}`)
      .send(gender);
    expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
  });

  test("Edit gender: invalid id", async () => {
    const gender = {
      name: gendersMock[1].name,
      _id: `324sdfsdf`,
    };
    const response = await api
      .put(`/api/v1/gender/edit/${gender._id}`)
      .send(gender);

    expect(response.body.msg).toEqual("INVALID_ID");
  });
});

describe("Genders DELETE method", () => {
  test("gender delete successfully", async () => {
    const response = await api.delete(
      `/api/v1/gender/delete/${gendersMock[0]._id}`
    );
    expect(response.body.msg).toEqual("GENDER_DELETED");
  });

  test("gender delete: gender not found", async () => {
    const response = await api.delete(
      `/api/v1/gender/delete/${new Types.ObjectId()}`
    );
    expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
  });

  test("gender delete: invalid id", async () => {
    const response = await api.delete(`/api/v1/gender/delete/qweqweqe2`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});

//
//
afterAll(() => {
  database.disconnect();
  server.close();
});
