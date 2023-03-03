import { buildSchema } from "graphql";

const gamesSchema = buildSchema(`
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

  listGames(page:Int ,limit:Int): returnedGames   
  

}



`);
export default gamesSchema;
