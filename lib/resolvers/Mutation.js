"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const admin = require("firebase-admin");
const apollo_server_1 = require("apollo-server");
const Mutation = {
    createUser(_, args) {
        try {
            admin
                .firestore()
                .collection("users")
                .add(args.user);
            return "User Saved Succesfully";
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error);
        }
    },
    updateUser: (_, args) => {
        const _a = args.user, { id } = _a, rest = __rest(_a, ["id"]);
        try {
            admin
                .firestore()
                .collection("users")
                .doc(id)
                .set(rest);
            return "User Updated Succesfully";
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error);
        }
    },
    deleteUser: (_, args) => {
        const { id } = args;
        try {
            admin
                .firestore()
                .collection("users")
                .doc(id)
                .delete();
            return "User Deleted Succesfully";
        }
        catch (error) {
            throw new apollo_server_1.ApolloError(error);
        }
    }
};
exports.default = Mutation;
//# sourceMappingURL=Mutation.js.map