"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const serviceAccount = require("../service-account");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const typeDefs = apollo_server_1.gql `
  type User {
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
}
`;
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers: resolvers_1.resolvers,
    introspection: true
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map