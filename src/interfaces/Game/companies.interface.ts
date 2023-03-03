import { Document, ObjectId } from "mongoose";

export interface companyBodyInterface {
  name: string;
}

export interface companiesInterface extends companyBodyInterface, Document {
  _id?: string | ObjectId;
}
