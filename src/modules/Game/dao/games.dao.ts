import mongoContainer from "../../../containers/mongoContainer";
import Games from "../model/games.model";
import {
  gamesBodyInterface,
  gamesInterface,
} from "../../../interfaces/Game/games.interface";
import paginationData from "../../../helpers/PaginationData";

export default class daoGames extends mongoContainer {
  constructor() {
    super(Games);
  }

  /**   CREATE GAME   **/
  async createGame(data: gamesBodyInterface) {
    try {
      return await this.model.create(data);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   LIST GAMES   **/
  async listGames(page: number, limit: number) {
    try {
      const data = await this.model
        .find({})
        .populate([
          { path: "gender", model: "genders" },
          { path: "platform", model: "platforms" },
          { path: "company", model: "companies" },
        ])
        .skip((page - 1) * limit)
        .limit(limit);

      //count the document's length
      const count = await this.model.countDocuments();
      //Return paginated data:
      return paginationData(data, page, limit, count, "games");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   UPDATE GAME IMAGE   **/
  async updateGameImage(id: string, path: string) {
    try {
      const game: gamesInterface = await this.model.findOne({ _id: id });

      game.image = path;

      return await game.save();
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   EDIT GAME   **/
  async editGame(id: string, data: gamesBodyInterface) {
    try {
      return await this.model.findByIdAndUpdate({ _id: id }, data);
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   LIST GAMES BY COMPANY   **/
  async listByCompany(id: string, page: number, limit: number) {
    try {
      const data = await this.model
        .find({ company: id })
        .populate([
          { path: "gender", model: "genders" },
          { path: "platform", model: "platforms" },
          { path: "company", model: "companies" },
        ])
        .skip((page - 1) * limit)
        .limit(limit);

      //count the document's length:
      const count = await this.model.countDocuments({ company: id });
      //Return paginated data:
      return paginationData(data, page, limit, count, "games");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   LIST GAMES BY PLATFORM   **/
  async listByPlatform(id: string, page: number, limit: number) {
    try {
      const data = await this.model
        .find({ platform: id })
        .populate([
          { path: "gender", model: "genders" },
          { path: "platform", model: "platforms" },
          { path: "company", model: "companies" },
        ])
        .skip((page - 1) * limit)
        .limit(limit);

      const count = await this.model.countDocuments({ platform: id });
      //Return paginated data:
      return paginationData(data, page, limit, count, "games");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   LIST GAMES BY GENDER   **/
  async listByGender(id: string, page: number, limit: number) {
    try {
      const data = await this.model
        .find({ gender: id })
        .populate([
          { path: "gender", model: "genders" },
          { path: "platform", model: "platforms" },
          { path: "company", model: "companies" },
        ])
        .skip((page - 1) * limit)
        .limit(limit);

      const count = await this.model.countDocuments({ gender: id });
      //Return paginated data:
      return paginationData(data, page, limit, count, "games");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   LIST GAMES BY NAME    **/
  async listByName(name: string, page: number, limit: number) {
    try {
      const data = await this.model
        .find({ name: { $regex: name, $options: "i" } })
        .populate([
          { path: "gender", model: "genders" },
          { path: "platform", model: "platforms" },
          { path: "company", model: "companies" },
        ])
        .skip((page - 1) * limit)
        .limit(limit);

      const count = await this.model.countDocuments({
        name: { $regex: name, $options: "i" },
      });
      //Return paginated data:
      return paginationData(data, page, limit, count, "games");
    } catch (e: any) {
      throw new Error(e);
    }
  }

  /**   LIST GAMES BY ID   **/
  async listByID(id: string) {
    try {
      return await this.model.findOne({ _id: id }).populate([
        { path: "gender", model: "genders" },
        { path: "platform", model: "platforms" },
        { path: "company", model: "companies" },
      ]);
    } catch (e: any) {
      throw new Error(e);
    }
  }
}
