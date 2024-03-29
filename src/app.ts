import express from "express";
import cors from "cors";
import { gamesRouter } from "./modules/Game/router";
import serverConfiguration from "./config/configServer";

//Graphql:
import { graphqlHTTP } from "express-graphql";
import {
  listGames,
  listGamesByCompany,
  listGamesByGender,
  listGamesByPlatform,
  listGamesByName,
} from "./graphql/resolvers.graphql";
import gamesSchema from "./graphql/schema.graphql";

const app = express();
const modeServer = serverConfiguration.server.mode;

//CORS:
const urlList = ["http://localhost:3000"];
const developmentOptions = {
  // credentials: true,
  origin: function (origin: any, callback: any) {
    if (!origin) {
      //for bypassing postman req with  no origin
      return callback(null, true);
    }
    if (urlList.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
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

app.use(
  cors(
    modeServer === "development" || modeServer === "test"
      ? developmentOptions
      : productionOptions
  )
);

app.use(express.json());

//Router:
app.use(gamesRouter);

app.use(
  "/api/v1/graphql",
  graphqlHTTP({
    schema: gamesSchema,
    rootValue: {
      listGames,
      listGamesByCompany,
      listGamesByGender,
      listGamesByPlatform,
      listGamesByName,
    },
    graphiql: true,
  })
);

export default app;
