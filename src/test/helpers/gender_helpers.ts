import { Types } from "mongoose";
import supertest from "supertest";
import { app } from "../../index";
import daoGenders from "../../modules/Game/dao/genders.dao";

//
// Dao:
export const dao = new daoGenders();

//
//Supertest api:
export const api = supertest(app);

//
//DATA MOCK:
export const gendersMock = [
  { name: "action", _id: `${new Types.ObjectId()}` },
  { name: "hack and slash", _id: `${new Types.ObjectId()}` },
  { name: "horror", _id: `${new Types.ObjectId()}` },
];
