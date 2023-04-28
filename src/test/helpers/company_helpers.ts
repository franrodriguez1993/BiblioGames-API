import { Types } from "mongoose";
import supertest from "supertest";
import { app } from "../../index";
import daoCompanies from "../../modules/Game/dao/companies.dao";

//
//Dao:
export const dao = new daoCompanies();

//
//Supertest api:
export const api = supertest(app);

//
//DATA MOCK:
export const companiesMock = [
  { name: "bethesda", _id: `${new Types.ObjectId()}` },
  { name: "electronic arts", _id: `${new Types.ObjectId()}` },
  { name: "activition", _id: `${new Types.ObjectId()}` },
];
