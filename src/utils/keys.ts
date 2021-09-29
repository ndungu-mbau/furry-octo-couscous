import { InjectionToken } from "graphql-modules";

const DatabaseConnection = new InjectionToken<string>('database-client');

export {
  DatabaseConnection
}