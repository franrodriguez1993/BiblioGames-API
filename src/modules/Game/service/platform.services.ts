import {
  platformBodyInterface,
  platformsInterface,
} from "../../../interfaces/Game/platforms.interface";
import daoPlatforms from "../dao/platforms.dao";
const platformDAO = new daoPlatforms();

export default class platformService {
  /** =========== CREATE PLATFORM ===========**/
  async createPlatform(data: platformBodyInterface) {
    //check:
    const checkName = await platformDAO.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //Create:
    const newPlatform: platformsInterface = await platformDAO.create(data);
    if (!newPlatform) {
      return "ERROR_CREATE";
    } else {
      return newPlatform._id;
    }
  }

  /** =========== LIST PLATFORM =========== **/

  async listPlatform() {
    return await platformDAO.getAll();
  }

  /**  =========== EDIT PLATFORM =========== **/

  async editPlatform(id: string, data: platformBodyInterface) {
    //check if exists:
    const checkPlatform = await platformDAO.getOneByID(id);
    if (!checkPlatform) {
      return "PLATFORM_NOT_FOUND";
    }
    //check name:
    const checkName = await platformDAO.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //Edit:
    const editedPlatform: platformsInterface = await platformDAO.edit(id, data);
    if (!editedPlatform) {
      return "ERROR_EDIT";
    } else {
      return editedPlatform._id;
    }
  }

  /**  =========== DELETE PLATFORM =========== **/
  async deletePlatform(id: string) {
    //check:
    const checkPlatform = await platformDAO.getOneByID(id);
    if (!checkPlatform) {
      return "PLATFORM_NOT_FOUND";
    }
    //Delete:
    return await platformDAO.delete(id);
  }
}
