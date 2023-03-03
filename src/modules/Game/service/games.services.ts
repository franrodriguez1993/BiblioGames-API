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

const gamesDao = new daoGames();
const companyDao = new daoCompanies();
const platformDao = new daoPlatforms();
const genderDao = new daoGenders();
const uploaderManager = new imageKitClass();

export default class gameService {
  /**  CREATE GAME  **/
  async createGame(data: gamesBodyInterface) {
    //check name:
    const checkName = await gamesDao.getOneByName(data.name);
    if (checkName) {
      return "NAME_ALREADY_IN_USE";
    }

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
