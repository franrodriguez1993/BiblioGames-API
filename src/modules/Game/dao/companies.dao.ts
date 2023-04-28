import mongoContainer from "../../../containers/mongoContainer";
import Companies from "../model/companies.model";
import { companyBodyInterface } from "../../../interfaces/Game/companies.interface";
import { logger } from "../../../helpers/logger";
export default class daoCompanies extends mongoContainer {
  constructor() {
    super(Companies);
  }

  /** CREATE **/
  async create(data: companyBodyInterface) {
    try {
      return await this.model.create({
        ...data,
      });
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }

  /**  EDIT   **/
  async edit(id: string, data: companyBodyInterface) {
    try {
      return await this.model.findByIdAndUpdate({ _id: id }, data);
    } catch (e: any) {
      logger.error(e.message);
      throw new Error(e);
    }
  }
}
