import mongoose from "mongoose";
import { logger } from "../helpers/logger";
import serverConfiguration from "./configServer";

export default class MongoDBClient {
  connected = false;
  client = mongoose;

  constructor() {
    this.connected = false;
    this.client = mongoose;
  }

  /**  CONNECT FUNCTION   **/
  async connect() {
    try {
      await this.client.set("strictQuery", false);
      await this.client.connect(
        serverConfiguration.mongodb.host || "",
        serverConfiguration.mongodb.options
      );

      this.connected = true;
      logger.info("Database connected successfully.");
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }

  /**  DISCONNECT FUNCTION   **/
  async disconnect() {
    try {
      await this.client.connection.close();
      this.connected = false;
      logger.info("Database disconnected.");
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }
}
