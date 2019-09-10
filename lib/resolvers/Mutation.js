"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const apollo_server_1 = require("apollo-server");
const Mutation = {
    createUser(_, args) {
        console.log(args);
        try {
            let response;
            admin
                .firestore()
                .collection(`users`)
                .add(args.user)
                .then(function (doc) {
                response = doc.get();
            });
            const user = response.data();
            return user || new apollo_server_1.ValidationError("User ID not found");
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error);
        }
    }
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map