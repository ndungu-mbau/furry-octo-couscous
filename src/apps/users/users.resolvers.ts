import { UsersService } from "./users.service"
import { User } from "../../types"

import { log } from "../../utils/logger"

export const UsersResolvers = {
  Query: {
    users: async (root, args, ctx) => {
      const userService: UsersService = ctx.injector.get(UsersService)
      const users : User[] = await userService.listAllUsers()
      return users
    },
    user: async (root, args, ctx) => {
      const userService: UsersService = ctx.injector.get(UsersService)
      const user : User = await userService.userById(args.id)
      return user
    },
    me: async (root, args, ctx) => {
      const userService: UsersService = ctx.injector.get(UsersService)
      const user : User = await userService.userById(ctx.user.id)
      return user
    },
  },
}