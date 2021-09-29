import { createApplication } from 'graphql-modules';

import { DatabaseConnection  } from '../utils/keys';
import { connection } from '../utils/connection';

import { UsersModule } from "./users"

import { UsersService } from './users/users.service';

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [UsersModule,],
  providers: [
    UsersService,
    {
      provide: DatabaseConnection,
      useFactory: () => {
        return connection.connect()
      }
    },
  ]
});

// This is your actual GraphQL schema
export const schema = application.schema;

export default application