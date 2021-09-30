import { ObjectId } from "mongodb";

export type Mechanic = {
  _id?: ObjectId,
  id: string,
  name: string,
  id_number: string
  phone: string
  email: string
  password?: string,
  area: string,
  id_image: string,
  profile_image: string
}

export type CreateMechanicDto = {
  name: string,
  id_number: string,
  email: string,
  phone: string,
  password: string,
  area: string,
  id_image: string,
  profile_image: string
}

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

//Shared types
export type CreateError = {
  ok: boolean,
  message: string,
}

export type LoginDto = {
  phone: string,
  password: string,
}

export type LoginReturn = {
  ok: boolean,
  token?: String,
  message: string,
}

export type CreateReturn = {
  ok: boolean,
  id: string,
  token: String,
}