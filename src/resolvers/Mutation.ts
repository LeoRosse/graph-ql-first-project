import * as admin from "firebase-admin";
import { ApolloError } from "apollo-server";

import { User } from "../@types/user";

const Mutation = {
  createUser(_: null, args: { user: User }) {
    try {
      admin
        .firestore()
        .collection("users")
        .add(args.user);
      return "User Saved Succesfully";
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  updateUser: (_: null, args: { user: User }) => {
    const { id, ...rest } = args.user;
    try {
      admin
        .firestore()
        .collection("users")
        .doc(id)
        .set(rest);
      return "User Updated Succesfully";
    } catch (error) {
      throw new ApolloError(error);
    }
  },
  deleteUser: (_: null, args: { id: string }) => {
    const { id } = args;
    try {
      admin
        .firestore()
        .collection("users")
        .doc(id)
        .delete();
      return "User Deleted Succesfully";
    } catch (error) {
      throw new ApolloError(error);
    }
  }
};

export default Mutation;
