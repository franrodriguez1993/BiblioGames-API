import { Document, ObjectId } from "mongoose";

export interface companyBodyInterface {
  name: string;
  _id?: string | ObjectId;
}

export interface companiesInterface extends companyBodyInterface, Document {
  _id: string | ObjectId;
}
