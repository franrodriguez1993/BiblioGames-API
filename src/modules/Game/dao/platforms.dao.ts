import mongoContainer from "../../../containers/mongoContainer";
import { platformBodyInterface } from "../../../interfaces/Game/platforms.interface";
import Platforms from "../model/platforms.model";
import { logger } from "../../../helpers/logger";

export default class daoPlatforms extends mongoContainer {
  constructor() {
    super(Platforms);
  }

  /** CREATE **/
  async create(data: platformBodyInterface) {
    try {
      return await this.model.create(data);
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }

  /**  EDIT   **/
  async edit(id: string, data: platformBodyInterface) {
    try {
      return await this.model.findByIdAndUpdate({ _id: id }, data);
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }
}
