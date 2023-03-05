//import Daos:
import daoGames from "../modules/Game/dao/games.dao";
import daoCompanies from "../modules/Game/dao/companies.dao";
import daoGenders from "../modules/Game/dao/genders.dao";
import daoPlatforms from "../modules/Game/dao/platforms.dao";

//Import interfaces:
import { companiesInterface } from "../interfaces/Game/companies.interface";
import { gendersInterface } from "../interfaces/Game/genders.interface";
import { platformsInterface } from "../interfaces/Game/platforms.interface";

//Instance Daos:
const gamesDao = new daoGames();
const companyDao = new daoCompanies();
const genderDao = new daoGenders();
const platformDao = new daoPlatforms();

/**  INTERFACE:    **/
interface listGamesParams {
  page: number;
  limit: number;
}

interface findGamesParams extends listGamesParams {
  name: string;
}

/**  QUERIES:  **/

//list games:
export async function listGames(data: listGamesParams) {
  try {
    return await gamesDao.listGames(data.page, data.limit);
  } catch (e: any) {
    return { status: 500, msg: e.message };
  }
}

//list by company:
export async function listGamesByCompany(data: findGamesParams) {
  try {
    const nameCompany = data.name.split("_").join(" ");
    const company: companiesInterface = await companyDao.getOneByName(
      nameCompany
    );
    if (!company) return { status: 404, msg: "COMPANY_NOT_FOUND" };

    return await gamesDao.listByCompany(
      company._id as string,
      data.page,
      data.limit
    );
  } catch (e: any) {
    return { status: 500, msg: e.message };
  }
}

//list by gender:
export async function listGamesByGender(data: findGamesParams) {
  try {
    const nameGender = data.name.split("_").join(" ");
    const gender: gendersInterface = await genderDao.getOneByName(nameGender);
    if (!gender) return { status: 404, msg: "GENDER_NOT_FOUND" };

    return await gamesDao.listByGender(
      gender._id as string,
      data.page,
      data.limit
    );
  } catch (e: any) {
    return { status: 500, msg: e.message };
  }
}

//list by platform:
export async function listGamesByPlatform(data: findGamesParams) {
  try {
    const namePlatform = data.name.split("_").join(" ");
    const platform: platformsInterface = await platformDao.getOneByName(
      namePlatform
    );
    if (!platform) return { status: 404, msg: "PLATFORM_NOT_FOUND" };

    return await gamesDao.listByPlatform(
      platform._id as string,
      data.page,
      data.limit
    );
  } catch (e: any) {
    return { status: 500, msg: e.message };
  }
}

//list by name:
export async function listGamesByName(data: findGamesParams) {
  try {
    const nameGame = data.name.split("_").join(" ");
    return await gamesDao.listByName(nameGame, data.page, data.limit);
  } catch (e: any) {
    return { status: 500, msg: e.message };
  }
}
