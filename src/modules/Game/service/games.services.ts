//Interfaces:
import {
  gamesBodyInterface,
  gamesInterface,
} from "../../../interfaces/Game/games.interface";
import { companiesInterface } from "../../../interfaces/Game/companies.interface";
import { platformsInterface } from "../../../interfaces/Game/platforms.interface";
import { gendersInterface } from "../../../interfaces/Game/genders.interface";
//Dao:
import daoGames from "../dao/games.dao";
import daoCompanies from "../dao/companies.dao";
import daoPlatforms from "../dao/platforms.dao";
import daoGenders from "../dao/genders.dao";
//Image uploader:
import imageKitClass from "../../../helpers/imageKitClass";
import { ObjectId, isValidObjectId } from "mongoose";

const gamesDao = new daoGames();
const companyDao = new daoCompanies();
const platformDao = new daoPlatforms();
const genderDao = new daoGenders();
const uploaderManager = new imageKitClass();

export default class gameService {
  /**  CREATE GAME  **/
  async createGame(data: gamesBodyInterface) {
    //Validate game id:
    if (data._id) {
      if (!isValidObjectId(data._id.toString())) return "INVALID_ID";
    }
    //validate gender id:
    if (data.gender.map((g) => isValidObjectId(g)).some((x) => x === false)) {
      return "INVALID_ID";
    }
    // validate platforms id:
    if (data.platform.map((p) => isValidObjectId(p)).some((x) => x === false)) {
      return "INVALID_ID";
    }
    // validate company id:
    if (!isValidObjectId(data.company)) return "INVALID_ID";

    //check name:
    const checkName = await gamesDao.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

    //check platforms:
    const platformsArray = await Promise.all(
      data.platform.map(async (p) => {
        const check = await platformDao.getOneByID(p);
        return check ? true : false;
      })
    );
    if (platformsArray.some((p) => p === false)) return "PLATFORM_NOT_FOUND";

    //check gender:
    const genderArray = await Promise.all(
      data.gender.map(async (g) => {
        const check = await genderDao.getOneByID(g);
        return check ? true : false;
      })
    );
    if (genderArray.some((g) => g === false)) return "GENDER_NOT_FOUND";

    //check company:
    const company = await companyDao.getOneByID(data.company as string);
    if (!company) return "COMPANY_NOT_FOUND";

    //Create:
    const newGame: gamesInterface = await gamesDao.createGame(data);

    if (!newGame) {
      return "ERROR_CREATE";
    } else {
      return newGame._id;
    }
  }

  /**  LIST GAME  **/
  async listGames(page: number, limit: number) {
    return await gamesDao.listGames(page, limit);
  }

  /**  UPLOAD GAME IMAGE **/
  async uploadGameImage(id: string, data: Buffer) {
    //Check game:
    const checkGame = await gamesDao.getOneByID(id);
    if (!checkGame) {
      return "GAME_NOT_FOUND";
    }

    const imageData = await uploaderManager.uploadImage(data);

    //Check path:
    if (!imageData) return "INVALID_PATH";
    //Edite game:
    const urlImg = imageData.url;
    const editedGame: gamesInterface = await gamesDao.updateGameImage(
      id,
      urlImg
    );

    if (!editedGame) {
      return "ERROR_EDIT";
    } else {
      return editedGame._id;
    }
  }

  /**  EDIT GAME **/
  async editGame(id: string, data: gamesBodyInterface) {
    //Validate game id:
    if (!isValidObjectId(id.toString())) return "INVALID_ID";

    //validate gender id:
    if (data.gender.map((g) => isValidObjectId(g)).some((x) => x === false)) {
      return "INVALID_ID";
    }
    // validate platforms id:
    if (data.platform.map((p) => isValidObjectId(p)).some((x) => x === false)) {
      return "INVALID_ID";
    }
    // validate company id:
    if (!isValidObjectId(data.company)) return "INVALID_ID";

    //check platforms:
    const platformsArray = await Promise.all(
      data.platform.map(async (p) => {
        const check = await platformDao.getOneByID(p);
        return check ? true : false;
      })
    );
    if (platformsArray.some((p) => p === false)) return "PLATFORM_NOT_FOUND";

    //check gender:
    const genderArray = await Promise.all(
      data.gender.map(async (g) => {
        const check = await genderDao.getOneByID(g);
        return check ? true : false;
      })
    );
    if (genderArray.some((g) => g === false)) return "GENDER_NOT_FOUND";

    //check company:
    const company = await companyDao.getOneByID(data.company as string);
    if (!company) return "COMPANY_NOT_FOUND";

    //check game:
    const checkGame = await gamesDao.getOneByID(id);
    if (!checkGame) return "GAME_NOT_FOUND";

    //Edit:
    const editedGame = await gamesDao.editGame(id, data);
    if (!editedGame) {
      return "ERROR_EDIT";
    } else {
      return editedGame._id;
    }
  }

  /**  DELETE GAME **/
  async deleteGame(id: string) {
    //Validate game id:
    if (!isValidObjectId(id.toString())) return "INVALID_ID";
    //check game:
    const check = await gamesDao.getOneByID(id);
    if (!check) return "GAME_NOT_FOUND";

    //delete:
    return await gamesDao.delete(id);
  }

  /**  LIST GAME BY COMPANY **/
  async listByCompany(name: string, page: number, limit: number) {
    const resetedName = name.split("_").join(" ");
    const company: companiesInterface = await companyDao.getOneByName(
      resetedName
    );
    if (!company) return "COMPANY_NOT_FOUND";

    return await gamesDao.listByCompany(company._id as string, page, limit);
  }

  /**   LIST GAMES BY PLATFORM   **/
  async listByPlatform(name: string, page: number, limit: number) {
    const resetedName = name.split("_").join(" ");
    const platform: platformsInterface = await platformDao.getOneByName(
      resetedName
    );
    if (!platform) return "PLATFORM_NOT_FOUND";

    return await gamesDao.listByPlatform(platform._id as string, page, limit);
  }

  /**   LIST GAMES BY GENDER   **/

  async listByGender(name: string, page: number, limit: number) {
    const resetedName = name.split("_").join(" ");
    const gender: gendersInterface = await genderDao.getOneByName(resetedName);
    if (!gender) return "GENDER_NOT_FOUND";

    return await gamesDao.listByGender(gender._id as string, page, limit);
  }

  /**   LIST GAMES BY NAME  **/
  async listByName(name: string, page: number, limit: number) {
    const resetedName = name.split("_").join(" ");
    return await gamesDao.listByName(resetedName, page, limit);
  }

  /**   LIST GAMES BY ID   **/

  async listByID(id: string) {
    const data = await gamesDao.listByID(id);
    if (!data) return "GAME_NOT_FOUND";
    else return data;
  }
}
