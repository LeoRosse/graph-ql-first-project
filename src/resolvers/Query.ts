import * as admin from "firebase-admin";
import { ApolloError, ValidationError } from "apollo-server";

import { User }  from '../@types/user';

const Query = {
  async users() {
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
};

export default Query;
