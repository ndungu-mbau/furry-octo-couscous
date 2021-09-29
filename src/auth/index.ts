import { Router } from "express";
import { authService } from "./auth.service";

import { log } from "../utils/logger"
import { CreateUserDto, CreateUserReturn, LoginUserDto, LoginUserReturn } from "../apps/users/users.types";
import { CreateMechanicDto, CreateMechanicReturn, LoginMechanicDto, LoginMechanicReturn } from "../apps/mechanics/mechanics.types";
const router: Router = Router();

const loginUsers = async (req, res) => {
  const { phone, password }: LoginUserDto = req.body;  
  const loginDetails: LoginUserReturn = await authService.login({ phone, password })

  res.json(loginDetails)
};

const signupUsers = async (req, res) => {

  const { name, email, phone, password, location, residence }: CreateUserDto = req.body;
  const userDetails: CreateUserReturn = await authService.signupUser({ name, location, residence, email, phone, password })

  return res.json(userDetails);
};

const loginMechanics = async (req, res) => {
  const { phone, password }: LoginUserDto = req.body;  
  const loginDetails: LoginUserReturn = await authService.login({ phone, password })

  res.json(loginDetails)
};

const signupMechanics = async (req, res) => {

  const { name, id_number, email, phone, password, area, id_image, profile_image }: CreateMechanicDto = req.body;
  const userDetails: CreateUserReturn = await authService.signupMechanic({ name, id_number, email, phone, password, area, id_image, profile_image })

  return res.json(userDetails);
};

const tokenMiddleware = (req, res, next) => {
  let token = req.headers["authorization"]; // Express headers are auto converted to lowercase
  if (token.startsWith("Bearer ")) {
    // Remove Bearer from string
    token = token.slice(7, token.length);
  }

  const { user, ok, message } = authService.verifyJwt(token)

  if(ok){
    res.locals.user = user
    next()
  } else {
    res.json({ ok, message })
  }
}

router.post("/users/signup", signupUsers);
router.post("/users/login", loginUsers);

router.post('/mechanics/signup', signupMechanics)
router.post('/mechanics/login', loginMechanics)

export { router, tokenMiddleware, };
