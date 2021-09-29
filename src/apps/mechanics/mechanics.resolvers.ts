import { MechanicsService } from "./mechanics.service"
import { Mechanic } from "./mechanics.types"

export const MechanicsResolvers = {
  Query: {
    mechanics: async (root, args, ctx) => {
      const mechanicService: MechanicsService = ctx.injector.get(MechanicsService)
      const mechanics : Mechanic[] = await mechanicService.listAllMechanics()
      return mechanics
    },
    mechanic: async (root, args, ctx) => {
      const mechanicService: MechanicsService = ctx.injector.get(MechanicsService)
      const mechanic : Mechanic = await mechanicService.mechanicById(args.id)
      return mechanic
    },
  },
}