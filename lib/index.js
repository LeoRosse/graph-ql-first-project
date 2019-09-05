"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const serviceAccount = require("../service-account");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const apollo_server_1 = require("apollo-server");
const typeDefs = apollo_server_1.gql `
  type User {
    id: ID!
    name: String!
  }

  type Tweet {
    id: ID!
    text: String!
  }

  type Query {
    users: [User]
    user(id: String!): User
  }
`;
const resolvers = {
    Query: {
        async users() {
            const users = await admin
                .firestore()
                .collection("users")
                .get();
            return users.docs.map(user => user.data());
        },
        async user(_, args) {
            try {
                const userDoc = await admin
                    .firestore()
                    .doc(`users/${args.id}`)
                    .get();
                const user = userDoc.data();
                return user || new apollo_server_1.ValidationError("User ID not found");
            }
            catch (error) {
                throw new apollo_server_1.ApolloError(error);
            }
        }
    }
};
const server = new apollo_server_1.ApolloServer({
    typeDefs,
    resolvers,
    introspection: true
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map