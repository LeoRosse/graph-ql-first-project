import * as admin from "firebase-admin";
const serviceAccount = require("../service-account");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

import { ApolloServer, ApolloError, ValidationError, gql } from "apollo-server";

interface User {
  id: string;
  name: string;
}

const typeDefs = gql`
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
    async tweets() {
      const users = await admin
        .firestore()
        .collection("users")
        .get();
      return users.docs.map(user => user.data()) as User[];
    },
    async user(_: null, args: { id: string }) {
      try {
        const userDoc = await admin
          .firestore()
          .doc(`users/${args.id}`)
          .get();
        const user = userDoc.data() as User | undefined;
        return user || new ValidationError("User ID not found");
      } catch (error) {
        throw new ApolloError(error);
      }
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
