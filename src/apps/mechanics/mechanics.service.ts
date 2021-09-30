import { Inject, Injectable } from "graphql-modules";
import { MongoClient } from "mongodb";
import uuid from "uuid-v4"

import { DatabaseConnection  } from "../../utils/keys";

import { Mechanic } from "../../types";

@Injectable()
export class MechanicsService{
  private repository

  constructor(@Inject(DatabaseConnection) connection){
    connection.then((client: MongoClient) => {
      this.repository = client.db().collection("mechanics")
    })
  }

  async listAllMechanics()  : Promise<Mechanic[]> {
    const mechanics = await this.repository.find({}).toArray()
    return mechanics.map(({ password, ...rest}) => rest as Mechanic)
  }

  async mechanicById(id: String) : Promise<Mechanic> {
    const { password, ...mechanic } : Mechanic = await this.repository.findOne({ id }) as Mechanic
    return mechanic
  }

  async mechanicByPhone(phone: String) : Promise<Mechanic> {
    const { password, ...mechanic } : Mechanic = await this.repository.findOne({ phone }) as Mechanic
    return mechanic
  }

  async createMechanic(mechanic) : Promise<Mechanic>{
    const id: String = uuid()
    const input = {
      ...mechanic,
      id,
      created_at: new Date().toISOString()
    }

    const res = await this.repository.insertOne(input)

    return input
  }
}