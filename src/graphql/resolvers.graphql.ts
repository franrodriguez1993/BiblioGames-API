import daoGames from "../modules/Game/dao/games.dao";

const gamesDao = new daoGames();

/**  LIST GAMES   **/
interface listGamesParams {
  page: number;
  limit: number;
}
export async function listGames(data: listGamesParams) {
  return await gamesDao.listGames(data.page, data.limit);
}
