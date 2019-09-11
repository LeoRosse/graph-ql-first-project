import * as admin from "firebase-admin";
import { ApolloServer, gql} from "apollo-server";
import { resolvers } from './resolvers';
const serviceAccount = require("../service-account");
import typeDefs from "./schema"

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true
});

server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
