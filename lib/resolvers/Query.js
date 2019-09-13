"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const apollo_server_1 = require("apollo-server");
const Query = {
    async users() {
        const users = await admin
            .firestore()
            .collection("users")
            .get();
        return users.docs.map(user => {
            const u = Object.assign({ id: user.id }, user.data());
            return u;
        });
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
};
exports.default = Query;
//# sourceMappingURL=Query.js.map