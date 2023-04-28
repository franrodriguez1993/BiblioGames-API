//Interfaces:
import { isValidObjectId } from "mongoose";
import {
  companyBodyInterface,
  companiesInterface,
} from "../../../interfaces/Game/companies.interface";
//Dao:
import daoCompanies from "../dao/companies.dao";

const dao = new daoCompanies();

export default class companyService {
  /** CREATE COMPANY  **/
  async createCompany(data: companyBodyInterface) {
    //Check:
    const checkName = await dao.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //Create:
    const newCompany: companiesInterface = await dao.create(data);
    if (!newCompany) {
      return "ERROR_CREATE";
    } else {
      return newCompany._id;
    }
  }

  /** LIST COMPANIES  **/
  async listCompanies() {
    return await dao.getAll();
  }

  /** EDIT COMPANIES  **/
  async editCompany(id: string, data: companyBodyInterface) {
    //validate id:
    if (!isValidObjectId(id)) return "INVALID_ID";

    //check if exists:
    const checkCompany = await dao.getOneByID(id);
    if (!checkCompany) {
      return "COMPANY_NOT_FOUND";
    }
    //check name:
    const checkName: companiesInterface = await dao.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //edit:
    const editedCompany: companiesInterface = await dao.edit(id, data);
    if (!editedCompany) {
      return "ERROR_EDIT";
    } else {
      return editedCompany._id;
    }
  }

  /** DELETE COMPANIES  **/
  async deleteCompany(id: string) {
    //validate id:
    if (!isValidObjectId(id)) return "INVALID_ID";

    //check:
    const check = await dao.getOneByID(id);
    if (!check) {
      return "COMPANY_NOT_FOUND";
    }
    return await dao.delete(id);
  }
}
