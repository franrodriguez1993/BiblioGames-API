import { Request, Response } from "express";
import { logger } from "../../../helpers/logger";
import { genderBodyInterface } from "../../../interfaces/Game/genders.interface";
import genderService from "../service/gender.services";

const service = new genderService();

export default class genderController {
  /**  =========== CREATE GENDER =========== **/
  async createGender(req: Request, res: Response) {
    try {
      //Data:
      const data: genderBodyInterface = { name: req.body.name };

      //Service:
      const resService = await service.createGender(data);

      //Response:
      if (resService === "NAME_ALREADY_IN_USE") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "ERROR_CREATE") {
        return res.status(500).json({ status: 500, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "GENDER_CREATED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  =========== LIST GENDER =========== **/
  async listGenders(req: Request, res: Response) {
    try {
      //Service:
      const resService = await service.listGender();

      //Return:
      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  =========== EDIT GENDER =========== **/

  async editGender(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;
      const data: genderBodyInterface = { name: req.body.name };

      //Service:
      const resService = await service.editGender(id, data);

      //Return:
      if (resService === "GENDER_NOT_FOUND") {
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
          .json({ status: 201, msg: "GENDER_EDITED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  =========== DELETE GENDER =========== **/
  async deleteGender(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;

      //Service:
      const resService = await service.deleteGender(id);

      //Response:
      if (resService === "GENDER_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (resService === "INVALID_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else {
        return res.status(200).json({ status: 200, msg: "GENDER_DELETED" });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }
}
