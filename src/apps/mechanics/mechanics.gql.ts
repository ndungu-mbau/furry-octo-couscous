import { gql } from 'graphql-modules';

export const MechanicTypes = gql`
  type Query {
      users: [User],
      user(id: String!): User,
      me: User
  }
  
  type User {
    id: String
    name: String
    phone: String
    email: String
  }
`;