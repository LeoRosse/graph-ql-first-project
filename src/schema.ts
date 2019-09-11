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
    createUser(user: CreateUserInput!): User!
  }
  
  input CreateUserInput {
    name: String!
    surname: String
    email: String!
}`;