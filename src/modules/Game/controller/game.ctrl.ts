import gameService from "../service/games.services";
import { logger } from "../../../helpers/logger";
import { Request, Response } from "express";
import { gamesBodyInterface } from "../../../interfaces/Game/games.interface";
const service = new gameService();

export default class gameController {
  /**  CREATE GAME  **/
  async createGame(req: Request, res: Response) {
    try {
      //Data:
      const data: gamesBodyInterface = req.body;

      //Service:
      const resService = await service.createGame(data);

      //Response:
      if (resService === "ERROR_CREATE") {
        return res.status(500).json({ status: 500, msg: resService });
      } else if (
        resService === "NAME_ALREADY_IN_USE" ||
        resService === "INVALID_ID" ||
        resService === "PLATFORM_NOT_FOUND" ||
        resService === "GENDER_NOT_FOUND" ||
        resService === "COMPANY_NOT_FOUND"
      ) {
        return res.status(400).json({ status: 400, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "GAME_CREATED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  LIST GAMES  **/
  async listGames(req: Request, res: Response) {
    try {
      //data:
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      //Service:
      const resService = await service.listGames(page, limit);

      //Return:
      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  UPLOAD GAME IMAGE  **/
  async uploadGameImg(req: Request, res: Response) {
    try {
      //Data:
      const { file } = req;
      const id = req.params.id;
      if (!file) {
        return res.status(400).json({ status: 400, msg: "FILE_REQUIRED" });
      }

      //Service:
      const resService = await service.uploadGameImage(id, file.buffer);

      //Response:
      if (resService === "GAME_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (resService === "INVALID_PATH") {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "ERROR_EDIT") {
        return res.status(500).json({ status: 500, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "IMAGE_UPLOADED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  EDIT GAME **/
  async editGame(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;
      const data: gamesBodyInterface = req.body;

      //Service:
      const resService = await service.editGame(id, data);

      //Return:
      if (resService === "GAME_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (
        resService === "INVALID_ID" ||
        resService === "PLATFORM_NOT_FOUND" ||
        resService === "GENDER_NOT_FOUND" ||
        resService === "COMPANY_NOT_FOUND"
      ) {
        return res.status(400).json({ status: 400, msg: resService });
      } else if (resService === "ERROR_EDIT") {
        return res.status(500).json({ status: 500, msg: resService });
      } else {
        return res
          .status(201)
          .json({ status: 201, msg: "GAME_EDITED", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  DELETE GAME **/
  async deleteGame(req: Request, res: Response) {
    try {
      //Data:
      const id = req.params.id;

      //Service:
      const resService = await service.deleteGame(id);

      //Return:
      if (resService === "GAME_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else if (resService === "INVALID_ID") {
        return res.status(400).json({ status: 400, msg: resService });
      } else {
        return res.status(200).json({ status: 200, msg: "GAME_DELETED" });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**  LIST GAME BY COMPANY **/

  async listByCompany(req: Request, res: Response) {
    try {
      //data:
      const name = req.params.name;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      //Service:
      const resService = await service.listByCompany(name, page, limit);

      //Return:
      if (resService === "COMPANY_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else {
        return res
          .status(200)
          .json({ status: 200, msg: "OK", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**   LIST GAMES BY PLATFORM   **/
  async listByPlatform(req: Request, res: Response) {
    try {
      //data:
      const name = req.params.name;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      //Service:
      const resService = await service.listByPlatform(name, page, limit);

      //Return:
      if (resService === "PLATFORM_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else {
        return res
          .status(200)
          .json({ status: 200, msg: "OK", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**   LIST GAMES BY GENDER   **/
  async listByGender(req: Request, res: Response) {
    try {
      //data:
      const name = req.params.name;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      //Service:
      const resService = await service.listByGender(name, page, limit);

      //Return:
      if (resService === "GENDER_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else {
        return res
          .status(200)
          .json({ status: 200, msg: "OK", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**   LIST GAMES BY ID   **/
  async listByID(req: Request, res: Response) {
    try {
      //data:
      const id = req.params.id;

      //Service:
      const resService = await service.listByID(id);

      //Return:
      if (resService === "GAME_NOT_FOUND") {
        return res.status(404).json({ status: 404, msg: resService });
      } else {
        return res
          .status(200)
          .json({ status: 200, msg: "OK", data: resService });
      }
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }

  /**   LIST GAMES BY NAME  **/

  async listByName(req: Request, res: Response) {
    try {
      //data:
      const name = req.params.name;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 10;

      //Service:
      const resService = await service.listByName(name, page, limit);

      //Return:
      return res.status(200).json({ status: 200, msg: "OK", data: resService });
    } catch (e: any) {
      logger.error(e.message);
      return res.status(500).json({ status: 500, msg: e.message, data: e });
    }
  }
}
