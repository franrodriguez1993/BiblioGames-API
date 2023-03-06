import { Schema, model, Model } from "mongoose";
import { platformsInterface } from "../../../interfaces/Game/platforms.interface";

const platformSchema: Schema<platformsInterface> = new Schema(
  {
    name: {
      type: String,
    },
  },
  { versionKey: false }
);

const Platforms: Model<platformsInterface> = model("platforms", platformSchema);

export default Platforms;
