import { Inject, Injectable } from "graphql-modules";
import { MongoClient } from "mongodb";

import { DatabaseConnection  } from "../../utils/keys";

import { User } from "../../types";

@Injectable()
export class UsersService{
  private repository

  constructor(@Inject(DatabaseConnection) connection){
    connection.then((client: MongoClient) => {
      this.repository = client.db().collection("users")
    })
  }

  async listAllUsers()  : Promise<User[]> {
    const users = await this.repository.find({}).toArray()
    return users.map(({ password, ...rest}) => rest as User)
  }

  async userById(id: String) : Promise<User> {
    const { password, ...user } : User = await this.repository.findOne({ id }) as User
    return user
  }

  async userByPhone(phone: String) : Promise<User> {
    const { password, ...user } : User = await this.repository.findOne({ phone }) as User
    return user
  }
}