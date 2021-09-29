import{ MechanicTypes } from './mechanics.gql';
import { MechanicsResolvers } from './mechanics.resolvers';
import { createModule } from 'graphql-modules';

export const MechanicsModule = createModule({
  id: 'mechanics-module',
  dirname: __dirname,
  typeDefs: [MechanicTypes],
  resolvers: [MechanicsResolvers],
});
