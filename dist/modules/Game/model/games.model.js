"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const GamesSchema = new mongoose_1.Schema({
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
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "companies",
        required: true,
    },
    platform: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "platforms" }],
        required: true,
    },
    gender: {
        type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "genders" }],
        required: true,
    },
    trailer: {
        type: String,
        required: true,
    },
}, { timestamps: true });
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
const Games = (0, mongoose_1.model)("games", GamesSchema);
exports.default = Games;
