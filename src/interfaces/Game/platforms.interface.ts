import { Document, ObjectId } from "mongoose";

export interface platformBodyInterface {
  name: string;
  _id?: string | ObjectId;
}

export interface platformsInterface extends platformBodyInterface, Document {
  _id: string | ObjectId;
}
