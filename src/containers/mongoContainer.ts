import { Model } from "mongoose";
import { logger } from "../helpers/logger";

export default class mongoContainer {
  model: Model<any>;
  constructor(model: Model<any>) {
    this.model = model;
  }

  /**  LIST  **/
  async getAll() {
    try {
      return await this.model.find({});
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }

  /**  GET BY ID  **/
  async getOneByID(id: string) {
    try {
      return await this.model.findOne({ _id: id });
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }
  /**  GET BY NAME  **/

  async getOneByName(name: string) {
    try {
      return await this.model.findOne({ name });
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }
  /**  DELETE BY ID  **/
  async delete(id: string) {
    try {
      return await this.model.findOneAndDelete({ _id: id });
    } catch (e: any) {
      logger.info(e.message);
      throw new Error(e);
    }
  }
  /**  DELETE ALL  **/
  async deleteAll() {
    try {
      return await this.model.deleteMany({});
    } catch (e: any) {
      logger.info(e.message);
      throw new Error(e);
    }
  }
}
