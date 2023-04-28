"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = require("./modules/Game/router");
const configServer_1 = __importDefault(require("./config/configServer"));
//Graphql:
const express_graphql_1 = require("express-graphql");
const resolvers_graphql_1 = require("./graphql/resolvers.graphql");
const schema_graphql_1 = __importDefault(require("./graphql/schema.graphql"));
const app = (0, express_1.default)();
const modeServer = configServer_1.default.server.mode;
//CORS:
const urlList = ["http://localhost:3000"];
const developmentOptions = {
    // credentials: true,
    origin: function (origin, callback) {
        if (!origin) {
            //for bypassing postman req with  no origin
            return callback(null, true);
        }
        if (urlList.indexOf(origin) !== -1) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
};
const productionOptions = {
    // credentials: true,
    origin: "*",
    methods: ["GET"],
};
app.use((0, cors_1.default)(modeServer === "development" || modeServer === "test"
    ? developmentOptions
    : productionOptions));
app.use(express_1.default.json());
//Router:
app.use(router_1.gamesRouter);
app.use("/api/v1/graphql", (0, express_graphql_1.graphqlHTTP)({
    schema: schema_graphql_1.default,
    rootValue: {
        listGames: resolvers_graphql_1.listGames,
        listGamesByCompany: resolvers_graphql_1.listGamesByCompany,
        listGamesByGender: resolvers_graphql_1.listGamesByGender,
        listGamesByPlatform: resolvers_graphql_1.listGamesByPlatform,
        listGamesByName: resolvers_graphql_1.listGamesByName,
    },
    graphiql: true,
}));
exports.default = app;
