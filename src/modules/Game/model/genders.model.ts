import { Schema, model, Model } from "mongoose";
import { gendersInterface } from "../../../interfaces/Game/genders.interface";

const genderSchema: Schema<gendersInterface> = new Schema({
  name: {
    type: String,
  },
});

const Genders: Model<gendersInterface> = model("genders", genderSchema);
export default Genders;
