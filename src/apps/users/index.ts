import{ UserTypes } from './users.gql';
import { UsersResolvers } from './users.resolvers';
import { createModule } from 'graphql-modules';

export const UsersModule = createModule({
  id: 'users-module',
  dirname: __dirname,
  typeDefs: [UserTypes],
  resolvers: [UsersResolvers],
});
