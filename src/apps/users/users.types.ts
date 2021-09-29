import { ObjectId } from "mongodb";

export type User = {
  _id?: ObjectId,
  id: string,
  name: string,
  phone: string,
  email: string,
  residence: string,
  location: string,
  password?: string,
}

export type CreateUserDto = {
  name: string,
  residence: string,
  location: string,
  email: string,
  phone: string,
  password: string,
}

export type LoginUserDto = {
  phone: string,
  password: string,
}

export type LoginUserReturn = {
  ok: boolean,
  token?: String,
  message: string,
}

export type CreateUserReturn = {
  ok: boolean,
  id: string,
  token: String,
}