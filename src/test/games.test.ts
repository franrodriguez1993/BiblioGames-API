import { server, database } from "../index";
import { Types } from "mongoose";

import { platformMock } from "./helpers/platform_helpers";
import { companiesMock } from "./helpers/company_helpers";
import { gendersMock } from "./helpers/gender_helpers";

import { gameBeforeEach, api, gamesMock } from "./helpers/game_helpers";

//
// BEFORE EACH:
gameBeforeEach();

describe("games GET method", () => {
  test("response returned as a json", async () => {
    await api
      .get("/api/v1/game/list")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("return games list", async () => {
    const response = await api.get("/api/v1/game/list");
    expect(response.body.data.games.length).toBeGreaterThanOrEqual(1);
  });

  test("return game by ID", async () => {
    const response = await api.get(`/api/v1/game/list/id/${gamesMock[0]._id}`);
    expect(response.body.msg).toEqual("OK");
    expect(response.body.data.name).toEqual(gamesMock[0].name);
  });

  test("return game by name", async () => {
    const response = await api.get(
      `/api/v1/game/list/name/${gamesMock[0].name}`
    );
    expect(response.body.msg).toEqual("OK");
  });

  test("return game by company", async () => {
    const response = await api.get(`/api/v1/game/list/company/bethesda`);
    expect(response.body.msg).toEqual("OK");
  });

  test("return game by platform", async () => {
    const response = await api.get(`/api/v1/game/list/platform/playstation_2`);
    expect(response.body.msg).toEqual("OK");
  });

  test("return game by gender", async () => {
    const response = await api.get(`/api/v1/game/list/gender/horror`);
    expect(response.body.msg).toEqual("OK");
  });
});

describe("games POST method", () => {
  test("create game: successfully", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("GAME_CREATED");
  });

  test("create game: invalid id", async () => {
    const newGame = {
      _id: `3asda2`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("create game: invalid gender id", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id, "dasda3"],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("create game: invalid platform id", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id, "dasda3"],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("create game: invalid company id", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: "adasd",
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("create game: platform not found", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: `${companiesMock[0]._id}`,
      gender: [gendersMock[0]._id],
      platform: [
        platformMock[0]._id,
        platformMock[1]._id,
        `${new Types.ObjectId()}`,
      ],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
  });

  test("create game: gender not found", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: `${companiesMock[0]._id}`,
      gender: [gendersMock[0]._id, `${new Types.ObjectId()}`],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
  });

  test("create game: company not found", async () => {
    const newGame = {
      _id: `${new Types.ObjectId()}`,
      name: "assasinss creed 3",
      release: "11/11/12",
      company: `${new Types.ObjectId()}`,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.post("/api/v1/game/create").send(newGame);
    expect(response.body.msg).toEqual("COMPANY_NOT_FOUND");
  });
});

describe("games PUT method", () => {
  test("edit game: successfully", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("GAME_EDITED");
  });

  test("edit game: invalid id", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api.put(`/api/v1/game/edit/adada`).send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("edit game: game not found", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${new Types.ObjectId()}`)
      .send(newGame);
    expect(response.body.msg).toEqual("GAME_NOT_FOUND");
  });

  test("edit game: invalid platform id", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id, "dadasd"],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("edit game: invalid gender id", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id, "dadasd"],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("edit game: invalid company id", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: "dasdasd",
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("INVALID_ID");
  });

  test("edit game: no name", async () => {
    const newGame = {
      name: "",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("INVALID_BODY_REQUEST");
  });

  test("edit game: company not found", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: `${new Types.ObjectId()}`,
      gender: [gendersMock[0]._id],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("COMPANY_NOT_FOUND");
  });

  test("edit game: gender not found", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id, `${new Types.ObjectId()}`],
      platform: [platformMock[0]._id, platformMock[1]._id],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("GENDER_NOT_FOUND");
  });

  test("edit game: platform not found", async () => {
    const newGame = {
      name: "assasinss creed III",
      release: "11/11/12",
      company: companiesMock[0]._id,
      gender: [gendersMock[0]._id],
      platform: [
        platformMock[0]._id,
        platformMock[1]._id,
        `${new Types.ObjectId()}`,
      ],
      trailer: "https://youtu.be/YS8-Rd4NDdA",
    };
    const response = await api
      .put(`/api/v1/game/edit/${gamesMock[0]._id}`)
      .send(newGame);
    expect(response.body.msg).toEqual("PLATFORM_NOT_FOUND");
  });
});

describe("game DELETE method", () => {
  test("delete game: successfully", async () => {
    const response = await api.delete(
      `/api/v1/game/delete/${gamesMock[0]._id}`
    );
    expect(response.body.msg).toEqual("GAME_DELETED");
  });

  test("delete game: game not found", async () => {
    const response = await api.delete(
      `/api/v1/game/delete/${new Types.ObjectId()}`
    );
    expect(response.body.msg).toEqual("GAME_NOT_FOUND");
  });

  test("delete game: invalid id", async () => {
    const response = await api.delete(`/api/v1/game/delete/sdasd`);
    expect(response.body.msg).toEqual("INVALID_ID");
  });
});
//
//
afterAll(() => {
  database.disconnect();
  server.close();
});
