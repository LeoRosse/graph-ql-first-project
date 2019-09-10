"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const apollo_server_1 = require("apollo-server");
const resolvers_1 = require("./resolvers");
const schema_1 = require("./schema");
const serviceAccount = require("../service-account");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});
const server = new apollo_server_1.ApolloServer({
    typeDefs: schema_1.default,
    resolvers: resolvers_1.resolvers,
    introspection: true
});
server.listen({ port: process.env.PORT || 4000 }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
//# sourceMappingURL=index.js.map