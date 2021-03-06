import { Injectable } from "graphql-modules";

import * as jwt from "jsonwebtoken";
import uuid from "uuid-v4";
import sha256 from "sha256";

import {
  CreateUserDto,
  CreateMechanicDto,
  CreateReturn,
  LoginDto,
  LoginReturn,
  CreateError,
} from "../types";

import { connection } from "../utils/connection";
import { log } from "../utils/logger";

const { SECRET = "" } = process.env;

@Injectable()
export class AuthService {
  generateToken(details): String {
    const token = jwt.sign(
      {
        details,
      },
      SECRET
    );

    return token;
  }

  generateHash(password: string): string {
    return sha256(password);
  }

  verifyJwt(token: String) {
    try {
      const decoded = jwt.verify(token, SECRET);

      return {
        ok: true,
        message: "Success",
        user: decoded,
      };
    } catch (err) {
      log(err);
      return {
        ok: false,
        message: "Token is not valid",
        user: undefined,
      };
    }
  }

  async login({
    phone,
    password,
  }: LoginDto): Promise<
    LoginReturn
  > {
    await connection.connect();

    const users = connection.db().collection("users");
    const mechanics = connection.db().collection("mechanics");

    const customer = await users.findOne({ phone });
    const mechanic = await mechanics.findOne({ phone });

    log({ mechanic, customer });

    const user = customer || mechanic;
    log(user);

    if (user) {
      log(this.generateHash(password) === user.password);
      if (this.generateHash(password) === user.password) {
        const token = this.generateToken({
          id: user?.id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
        });
        return {
          ok: true,
          token,
          message: "Successfully logged in",
        };
      } else {
        return {
          ok: false,
          message: "Failed: phone/password combination wrong",
        };
      }
    } else {
      return {
        ok: false,
        message: "Failed: phone/password combination wrong",
      };
    }
  }

  async signupUser({
    name,
    email,
    phone,
    password,
    location,
    residence,
  }: CreateUserDto): Promise<CreateReturn | CreateError> {
    await connection.connect();

    const users = connection.db().collection("users");

    const tryUser = await users.find({ phone });
    if (!tryUser) {
      const user_id = uuid();
      const hash = await this.generateHash(password);

      log(hash);

      await users.insertOne({
        id: user_id,
        name,
        location,
        residence,
        email,
        phone,
        password: hash,
      });

      const token: String = this.generateToken({
        id: user_id,
        name,
        email,
        phone,
      });

      return { ok: true, id: user_id, token };
    } else {
      return { ok: false, message: "Phone number already in use" };
    }
  }

  async signupMechanic({
    name,
    email,
    phone,
    password,
    area,
    id_image,
    id_number,
    profile_image,
  }: CreateMechanicDto): Promise<CreateReturn | CreateError> {
    await connection.connect();

    const mechanics = connection.db().collection("mechanics");

    const tryUser = await mechanics.find({ phone });
    if (!tryUser) {
      const mechanic_id = uuid();
      const hash = await this.generateHash(password);

      log(hash);

      await mechanics.insertOne({
        id: mechanic_id,
        name,
        area,
        id_image,
        id_number,
        profile_image,
        email,
        phone,
        password: hash,
      });

      const token: String = this.generateToken({
        id: mechanic_id,
        name,
        email,
        phone,
      });

      return { ok: true, id: mechanic_id, token };
    } else {
      return { ok: false, message: "Phone number already in use" };
    }
  }
}

export const authService = new AuthService();
