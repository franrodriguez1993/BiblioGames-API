import { Document, ObjectId } from "mongoose";

export interface genderBodyInterface {
  name: string;
  _id?: string | ObjectId;
}

export interface gendersInterface extends genderBodyInterface, Document {
  _id: string | ObjectId;
}
