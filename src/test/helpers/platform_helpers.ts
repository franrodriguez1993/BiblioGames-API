import { Types } from "mongoose";
import supertest from "supertest";
import { app } from "../../index";
import daoPlatforms from "../../modules/Game/dao/platforms.dao";

export const api = supertest(app);

export const dao = new daoPlatforms();

export const platformMock = [
  { name: "playstation 1", _id: `${new Types.ObjectId()}` },
  { name: "playstation 2", _id: `${new Types.ObjectId()}` },
  { name: "playstation 3", _id: `${new Types.ObjectId()}` },
];
