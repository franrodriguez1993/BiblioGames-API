import { Document, ObjectId } from "mongoose";

export interface platformBodyInterface {
  name: string;
}

export interface platformsInterface extends platformBodyInterface, Document {
  _id?: string | ObjectId;
}
