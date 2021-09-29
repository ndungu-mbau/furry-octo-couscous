import { createApplication } from 'graphql-modules';

import { DatabaseConnection  } from '../utils/keys';
import { connection } from '../utils/connection';

import { UsersModule } from "./users"
import { MechanicsModule } from './mechanics';

import { UsersService } from './users/users.service';
import { MechanicsService } from './mechanics/mechanics.service';

// This is your application, it contains your GraphQL schema and the implementation of it.
const application = createApplication({
  modules: [UsersModule, MechanicsModule],
  providers: [
    UsersService,
    MechanicsService,
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