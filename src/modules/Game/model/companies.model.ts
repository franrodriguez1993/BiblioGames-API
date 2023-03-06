import { Schema, model, Model } from "mongoose";

import { companiesInterface } from "../../../interfaces/Game/companies.interface";

const companySchema: Schema<companiesInterface> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

const Companies: Model<companiesInterface> = model("companies", companySchema);
export default Companies;
