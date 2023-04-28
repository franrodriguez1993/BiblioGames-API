import { server, database } from "../index";
import { Types } from "mongoose";

//Helpers:

import { platformMock, api, dao } from "./helpers/platform_helpers";

//
//
beforeEach(async () => {
  await dao.deleteAll();
  Promise.all(
    platformMock.map(async (p) => {
      await dao.create(p);
    })
  );
});

describe("platforms GET method", () => {
  test("response returned as a json", async () => {
    await api
      .get("/api/v1/platform/list")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("return platform list", async () => {
    const response = await api.get("/api/v1/platform/list");
    expect(response.body.data.length).toBeGreaterThanOrEqual(1);
  });
});

describe("platforms POST method", () => {
  test("create platform: successfully", async () => {
    const newPlatform = { name: "xbox one", _id: `${new Types.ObjectId()}` };
    const response = await api
      .post("/api/v1/platform/create")
      .send(newPlatform);
    expect(response.body.msg).toEqual("PLATFORM_CREATED");
  });

  test("create platform: no name", async () => {
    const newPlatform = { name: "", _id: `${new Types.ObjectId()}` };
    const response = await api
      .post("/api/v1/platform/create")
      .send(newPlatform);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("create platform: name to long", async () => {
    const newPlatform = {
      name: "esternocleidomastoideodreamcatcherlinkinparkevanescenceskilletnickel",
      _id: `${new Types.ObjectId()}`,
    };
    const response = await api
      .post("/api/v1/platform/create")
      .send(newPlatform);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("create platform: name in use", async () => {
    const newPlatform = {
      name: platformMock[0].name,
      _id: `${new Types.ObjectId()}`,
    };
    const response = await api
      .post("/api/v1/platform/create")
      .send(newPlatform);
    expect(response.body.msg).toEqual("NAME_ALREADY_IN_USE");
  });
});

describe("platform PUT method", () => {
  test("edit platform: successfully", async () => {
    const newPlatform = { name: "playstation one", _id: platformMock[0]._id };
    const response = await api
      .put(`/api/v1/platform/edit/${newPlatform._id}`)
      .send(newPlatform);
    expect(response.body.msg).toEqual("PLATFORM_EDITED");
  });

  test("edit platform: no name", async () => {
    const newPlatform = { name: "", _id: platformMock[0]._id };
    const response = await api
      .put(`/api/v1/platform/edit/${newPlatform._id}`)
      .send(newPlatform);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("edit platform: name to long", async () => {
    const newPlatform = {
      name: "esternocleidomastoideodreamcatcherlinkinparkevanescenceskilletnickel",
      _id: platformMock[0]._id,
    };
    const response = await api
      .put(`/api/v1/platform/edit/${newPlatform._id}`)
      .send(newPlatform);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("edit platform: platform not found", async () => {
    const newPlatform = {
      name: "playstation one",
      _id: `${new Types.ObjectId()}`,
    };
    const response = await api
      .put(`/api/v1/platform/edit/${newPlatform._id}`)
      .send(newPlatform);
    expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
  });

  test("edit platform: invalid id", async () => {
    const newPlatform = {
      name: "playstation one",
      _id: `SDADaa`,
    };
    const response = await api
      .put(`/api/v1/platform/edit/${newPlatform._id}`)
      .send(newPlatform);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});

describe("platform delete", () => {
  test("platform delete: successfully", async () => {
    const response = await api.delete(
      `/api/v1/platform/delete/${platformMock[0]._id}`
    );
    expect(response.body.msg).toEqual("PLATFORM_DELETED");
  });

  test("platform delete: platform not found", async () => {
    const response = await api.delete(
      `/api/v1/platform/delete/${new Types.ObjectId()}`
    );
    expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
  });

  test("platform delete: invalid id", async () => {
    const response = await api.delete(`/api/v1/platform/delete/ASDA2`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});

//
//
afterAll(() => {
  database.disconnect();
  server.close();
});
