export default `type User {
    id: ID!
    name: String!
    surname: String
    email: String
  }

  type Query {
    users: [User]
    user(id: String!): User
  }

  type Mutation {
    createUser(user: CreateUserInput!): String!
    updateUser(user: UpdateUserInput!): String!
    deleteUser(id: ID!): String!
  }
  
  input CreateUserInput {
    name: String!
    surname: String
    email: String!
}

input UpdateUserInput {
  id: ID!
  name: String
  surname: String
  email: String
}
`;
