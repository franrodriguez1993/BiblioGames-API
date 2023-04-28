import { Request, Response } from "express";
import { logger } from "../../../helpers/logger";
import { platformBodyInterface } from "../../../interfaces/Game/platforms.interface";
import platformService from "../service/platform.services";

const service = new platformService();

export default class platformController {
  /** =========== CREATE PLATFORM ===========**/
  async createPlatform(req: Request, res: Response) {
    try {
      //Data:
      const data: platformBodyInterface = { name: req.body.name };

      //Service:
      const resService = await service.createPlatform(data);

      //Response:
      if (resService === "NAME_ALREADY_IN_USE") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "ERROR_CREATE") {
        return res.status(500).json({ status: 500, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "PLATFORM_CREATED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  =========== LIST PLATFORMS =========== **/
  async listPlatforms(req: Request, res: Response) {
    try {
      //Service:
      const resService = await service.listPlatform();

      //Return:
      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  =========== EDIT PLATFORM =========== **/
  async editPlatform(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;
      const data: platformBodyInterface = { name: req.body.name };

      //Service:
      const resService = await service.editPlatform(id, data);

      //Return:
      if (resService === "PLATFORM_NOT_FOUND") {
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
          .json({ status: 201, msg: "PLATFORM_EDITED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  =========== DELETE PLATFORM =========== **/
  async deletePlatform(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;

      //Service:
      const resService = await service.deletePlatform(id);

      //Response:
      if (resService === "PLATFORM_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (resService === "INVALID_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else {
        return res.status(200).json({ status: 200, msg: "PLATFORM_DELETED" });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }
}
