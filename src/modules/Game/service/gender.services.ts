import {
  genderBodyInterface,
  gendersInterface,
} from "../../../interfaces/Game/genders.interface";
import daoGenders from "../dao/genders.dao";

const genderDAO = new daoGenders();

export default class genderService {
  /** =========== CREATE GENDER ===========**/
  async createGender(data: genderBodyInterface) {
    //check:
    const checkName = await genderDAO.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //Create:
    const newGender: gendersInterface = await genderDAO.create(data);
    if (!newGender) {
      return "ERROR_CREATE";
    } else {
      return newGender._id;
    }
  }

  /** =========== LIST GENDER =========== **/

  async listGender() {
    return await genderDAO.getAll();
  }

  /**  =========== EDIT GENDER =========== **/

  async editGender(id: string, data: genderBodyInterface) {
    //check if exists:
    const checkGender = await genderDAO.getOneByID(id);
    if (!checkGender) {
      return "GENDER_NOT_FOUND";
    }
    //check name:
    const checkName = await genderDAO.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //Edit:
    const editedGender: gendersInterface = await genderDAO.edit(id, data);
    if (!editedGender) {
      return "ERROR_EDIT";
    } else {
      return editedGender._id;
    }
  }

  /**  =========== DELETE GENDER =========== **/
  async deleteGender(id: string) {
    //check:
    const checkGender = await genderDAO.getOneByID(id);
    if (!checkGender) {
      return "GENDER_NOT_FOUND";
    }
    //Delete:
    return await genderDAO.delete(id);
  }
}
