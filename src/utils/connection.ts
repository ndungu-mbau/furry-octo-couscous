import { MongoClient  } from "mongodb";

const { DB_URI = "" } = process.env 

const connection : MongoClient = new MongoClient(DB_URI, {}) 

export {
  connection
}
