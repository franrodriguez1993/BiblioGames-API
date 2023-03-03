import mongoContainer from "../../../containers/mongoContainer";
import Genders from "../model/genders.model";
import { genderBodyInterface } from "../../../interfaces/Game/genders.interface";
import { logger } from "../../../helpers/logger";

export default class daoGenders extends mongoContainer {
  constructor() {
    super(Genders);
  }

  /** CREATE **/

  async create(data: genderBodyInterface) {
    try {
      return await this.model.create(data);
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }

  /**  EDIT   **/
  async edit(id: string, data: genderBodyInterface) {
    try {
      return await this.model.findByIdAndUpdate({ _id: id }, data);
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }
}
