import "dotenv/config";
import MongoDBClient from "./config/MongoDBClass";
import serverConfiguration from "./config/configServer";
import { logger } from "./helpers/logger";
import app from "./app";

const PORT = serverConfiguration.server.port;
const MODE = serverConfiguration.server.mode;
const URL_API = serverConfiguration.server.urlApi;

async function main() {
  await new MongoDBClient().connect();
  if (MODE === "development") {
    app.listen(PORT, () => {
      logger.info(`Server up in ${URL_API}${PORT} - MODE: development`);
    });
  } else {
    app.listen(PORT, () => {
      logger.info(`Server up in ${URL_API} - MODE: Production`);
    });
  }
}

main();
