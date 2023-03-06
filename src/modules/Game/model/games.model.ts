import { Schema, model, Model } from "mongoose";

//  mongoose.PaginateModel<gamesInterface>
import { gamesInterface } from "../../../interfaces/Game/games.interface";
const GamesSchema: Schema<gamesInterface> = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    release: {
      type: String,
      required: true,
    },
    company: {
      type: Schema.Types.ObjectId,
      ref: "companies",
      required: true,
    },
    platform: {
      type: [{ type: Schema.Types.ObjectId, ref: "platforms" }],
      required: true,
    },
    gender: {
      type: [{ type: Schema.Types.ObjectId, ref: "genders" }],
      required: true,
    },
    trailer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

//Solución 1 no sirvió de stackoverflow:
// interface GamesModel<T extends Document> extends PaginateModel<T> {}

// const Games: GamesModel<gamesInterface> = model(
//   "games",
//   GamesSchema
// ) as GamesModel<gamesInterface>;

//Solucion 2 que no sirvió: (de la documentación)
// const Games = model<gamesInterface, PaginateModel<gamesInterface>>(
//   "games",
//   GamesSchema
// );

const Games: Model<gamesInterface> = model("games", GamesSchema);

export default Games;
