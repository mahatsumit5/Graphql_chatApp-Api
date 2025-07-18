import { Resolvers } from "../types/types.js";
import { hashPass } from "../utils/bcrypt.js";
export const userResolver: Resolvers = {
  Mutation: {
    logout: (_, { email }, { dataSources }) => {
      return dataSources.userAPI.logout(email);
    },

    updateUser: (_, args, { dataSources }) => {
      if (args?.password) {
        args.password = hashPass(args.password);
      }
      return dataSources.userAPI.updateUser(args);
    },
  },
  Query: {
    allUsers: (__, { params }, { dataSources }) => {
      return dataSources.userAPI.allUsers(params);
    },
    loggedInUser: (__, args, { dataSources }) => {
      return dataSources.userAPI.loggedInUser();
    },
    allFriends: (__, _, { dataSources }) => {
      return dataSources.userAPI.getListOfFriends();
    },
  },
};
