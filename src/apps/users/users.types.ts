import { gql } from 'graphql-modules';

export const UserTypes = gql`
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
    location: String
    residence: String
  }
`;