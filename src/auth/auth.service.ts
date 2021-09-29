import { Injectable  } from "graphql-modules"

import * as jwt from "jsonwebtoken"
import uuid from "uuid-v4"
import argon from 'argon2'

import { CreateUserDto, CreateUserReturn, LoginUserDto, LoginUserReturn } from "../apps/users/users.types"
import { CreateMechanicDto, LoginMechanicReturn, LoginMechanicDto, CreateMechanicReturn } from "../apps/mechanics/mechanics.types"

import { connection } from "../utils/connection";
import { log } from "../utils/logger"

const { SECRET = "" } = process.env;

@Injectable()
export class AuthService{
  generateToken(details) : String {
    const token = jwt.sign({
      details
    }, SECRET)

    return token
  }

  verifyJwt(token: String){
    try{
      const decoded = jwt.verify(token, SECRET)

      return {
        ok: true,
        message: "Success",
        user: decoded
      }
    } catch(err){
      log(err)
        return {
          ok: false,
          message: "Token is not valid",
          user: undefined,
        }
    }
  }

  async login({ phone,password } : LoginUserDto | LoginMechanicDto): Promise<LoginUserReturn | LoginMechanicReturn> {
    await connection.connect();
  
    const users = connection.db().collection("users");
    const mechanics = connection.db().collection("mechanics");
  
    const customer = await users.findOne({ phone });
    const mechanic = await mechanics.findOne({ phone })

    const user = customer || mechanic
    log(user);
  
    if(user){
      if (await argon.verify(user?.password, password)) {
        const token = this.generateToken({
          id: user?.id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
        })
        return {
          ok: true,
          token,
          message: "Successfully logged in"
        }
      } else {
        return {
          ok: false,
          message: "Failed: phone/password combination wrong"
        }
      }
    } else {
      return {
        ok: false,
        message: "Failed: phone/password combination wrong"
      }
    }
  }

  async signupUser({ name, email, phone, password, location, residence }: CreateUserDto): Promise<CreateUserReturn>{
    await connection.connect();

    const users = connection.db().collection("users");
  
    const user_id = uuid();
  
    await users.insertOne({
      id: user_id,
      name,
      location,
      residence,
      email,
      phone,
      password: argon.hash(password),
    });
  
    const token: String = this.generateToken({
      id: user_id,
      name,
      email,
      phone,
    })
  
    return { ok: true, id: user_id, token }
  }

  async signupMechanic({ name, email, phone, password, area, id_image, id_number, profile_image }: CreateMechanicDto): Promise<CreateUserReturn>{
    await connection.connect();

    const users = connection.db().collection("users");
  
    const user_id = uuid();
  
    await users.insertOne({
      id: user_id,
      name,
      area, 
      id_image,
      id_number,
      profile_image,
      email,
      phone,
      password: argon.hash(password),
    });
  
    const token: String = this.generateToken({
      id: user_id,
      name,
      email,
      phone,
    })
  
    return { ok: true, id: user_id, token }
  }
}

export const authService = new AuthService()