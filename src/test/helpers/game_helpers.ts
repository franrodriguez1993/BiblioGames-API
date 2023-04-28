import { Types } from "mongoose";
import supertest from "supertest";
import { app } from "../../index";
import daoGames from "../../modules/Game/dao/games.dao";
//mock helpers:
import { platformMock, dao as daoPlaformMock } from "./platform_helpers";
import { companiesMock, dao as daoCompanyMock } from "./company_helpers";
import { gendersMock, dao as daoGenderMock } from "./gender_helpers";

export const api = supertest(app);

export const daoGamesMock = new daoGames();

export const gamesMock = [
  {
    _id: `${new Types.ObjectId()}`,
    name: "assassins creed",
    release: "02/07/07",
    company: `${companiesMock[0]._id}`,
    platform: [
      `${platformMock[0]._id}`,
      `${platformMock[1]._id}`,
      `${platformMock[2]._id}`,
    ],
    gender: [`${gendersMock[0]._id}`, `${platformMock[1]._id}`],
    trailer: "https://youtu.be/RjQ6ZtyXoA0",
  },
  {
    _id: `${new Types.ObjectId()}`,
    name: "assassins creed 2",
    release: "02/07/09",
    company: `${companiesMock[0]._id}`,
    platform: [
      `${platformMock[0]._id}`,
      `${platformMock[1]._id}`,
      `${platformMock[2]._id}`,
    ],
    gender: [`${gendersMock[0]._id}`, `${platformMock[1]._id}`],
    trailer: "https://youtu.be/_xkCPNECud8",
  },
];

// beforeAll
export const gameBeforeEach = () => {
  beforeEach(async () => {
    await daoPlaformMock.deleteAll();
    await daoCompanyMock.deleteAll();
    await daoGenderMock.deleteAll();
    await daoGamesMock.deleteAll();

    await Promise.all(
      platformMock.map(async (p) => {
        await daoPlaformMock.create(p);
      })
    );

    await Promise.all(
      gendersMock.map(async (g) => {
        await daoGenderMock.create(g);
      })
    );

    await Promise.all(
      companiesMock.map(async (c) => {
        await daoCompanyMock.create(c);
      })
    );

    await Promise.all(
      gamesMock.map(async (g) => {
        await daoGamesMock.createGame(g);
      })
    );
  });
};
