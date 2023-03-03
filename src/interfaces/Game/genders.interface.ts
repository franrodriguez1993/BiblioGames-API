import { Document, ObjectId } from "mongoose";

export interface genderBodyInterface {
  name: string;
}

export interface gendersInterface extends genderBodyInterface, Document {
  _id?: string | ObjectId;
}
