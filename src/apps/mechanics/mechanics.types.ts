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

export type LoginMechanicDto = {
  phone: string,
  password: string,
}

export type LoginMechanicReturn = {
  ok: boolean,
  token?: String,
  message: string,
}

export type CreateMechanicReturn = {
  ok: boolean,
  id: string,
  token: String,
}