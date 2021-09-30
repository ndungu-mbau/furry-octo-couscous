import { gql } from 'graphql-modules';

export const MechanicTypes = gql`
  extend type Query {
      mechanics: [Mechanic],
      mechanic(id: String!): Mechanic,
  }
  
  type Mechanic {
    id: String,
    name: String,
    id_number: String
    phone: String
    email: String
    area: String,
    id_image: String,
    profile_image: String
  }
`;