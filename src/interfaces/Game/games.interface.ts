import { ObjectId, Document } from "mongoose";

//Interfaces:
import { companiesInterface } from "./companies.interface";
import { gendersInterface } from "./genders.interface";
import { platformsInterface } from "./platforms.interface";

export interface gamesBodyInterface {
  _id?: string | ObjectId;
  name: string;
  image?: string;
  release: string;
  company: string | ObjectId | companiesInterface;
  platform: Array<string> | Array<ObjectId> | Array<platformsInterface>;
  gender: Array<string> | Array<ObjectId> | Array<gendersInterface>;
  trailer: string;
}

export interface gamesInterface extends gamesBodyInterface, Document {
  _id: string | ObjectId;
  createdAt: string;
}
