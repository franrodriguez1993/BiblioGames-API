import { Request, Response } from "express";
import { logger } from "../../../helpers/logger";
import { companyBodyInterface } from "../../../interfaces/Game/companies.interface";
import companyService from "../service/company.services";
const service = new companyService();

export default class companyController {
  /** CREATE COMPANY **/
  async createCompany(req: Request, res: Response) {
    try {
      //data:
      const body: companyBodyInterface = { name: req.body.name };

      //Service:
      const resService = await service.createCompany(body);

      //Response:
      if (resService === "NAME_ALREADY_IN_USE") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "ERROR_CREATE") {
        return res.status(500).json({ status: 500, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "COMPANY_CREATED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /** LIST COMPANIES **/
  async listCompanies(req: Request, res: Response) {
    try {
      //Service:
      const resService = await service.listCompanies();

      //Return:
      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /** EDIT COMPANY **/
  async editCompany(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;
      const data: companyBodyInterface = { name: req.body.name };

      //Service:
      const resService = await service.editCompany(id, data);

      //Response:
      if (resService === "COMPANY_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (
        resService === "NAME_ALREADY_IN_USE" ||
        resService === "INVALID_ID"
      ) {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "ERROR_EDIT") {
        return res.status(500).json({ status: 500, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "EDITED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /** DELETE COMPANY **/
  async deleteCompany(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;

      //Service:
      const resService = await service.deleteCompany(id);

      if (resService === "COMPANY_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (resService === "INVALID_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else {
        return res.status(200).json({ status: 200, msg: "COMPANY_DELETED" });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }
}
