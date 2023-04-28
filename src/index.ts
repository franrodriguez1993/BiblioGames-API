import "dotenv/config";
import MongoDBClient from "./config/MongoDBClass";
import serverConfiguration from "./config/configServer";
import { logger } from "./helpers/logger";
import app from "./app";

const PORT = serverConfiguration.server.port;
const MODE = serverConfiguration.server.mode;
const URL_API = serverConfiguration.server.urlApi;

const database = new MongoDBClient();

const server = app.listen(PORT, async () => {
  await database.connect();
  MODE === "development" || MODE === "test"
    ? logger.info(`Server up in ${URL_API}${PORT} - MODE: development`)
    : logger.info(`Server up in ${URL_API} - MODE: Production`);
});

export { app, server, database };
