"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const gamesSchema = (0, graphql_1.buildSchema)(`
  type Company {
    _id:ID!,
    name: String
  }

  type Gender {    
    _id:ID!,
    name: String
  }

  type Platform {    
    _id:ID!,
    name: String
  }

type Games {
  _id: ID!,
  name: String,
  image: String,
  release:String,
  company: Company,
  platform: [Platform],
  gender: [Gender],
  trailer:String,
}
type returnedGames {    
  games:[Games],
    currentPage:Int,
    total:Int,
    pageSize:Int,
    totalPage:Int,   }

type Query {

  listGames(page:Int ,limit:Int): returnedGames,
  listGamesByCompany(name:String,page:Int ,limit:Int): returnedGames,  
  listGamesByGender(name:String,page:Int ,limit:Int): returnedGames,
  listGamesByPlatform(name:String,page:Int ,limit:Int): returnedGames,
  listGamesByName(name:String,page:Int ,limit:Int): returnedGames, 
  

}



`);
exports.default = gamesSchema;
