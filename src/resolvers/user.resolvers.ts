import { Resolvers, SignInParams, SignUpUserParams } from "../types/types";
import { authoriseUser } from "../middleware";
export const userResolvers: Resolvers = {
  Mutation: {
    signUp: async (parent, { input }, { dataSources }) => {
      return await dataSources.userAPI.signUp(input as SignUpUserParams);
    },
    signIn: (parent, { input }, { dataSources }) => {
      return dataSources.userAPI.signIn(input as SignInParams);
    },
    logout: (_, __, { dataSources }) => {
      return dataSources.userAPI.logout();
    },
    resetPassword: (_, { newPassword }, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);

      return dataSources.userAPI.resetPassword(newPassword);
    },
    newJwt: (_, __, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);

      return dataSources.userAPI.newJwt();
    },
    updateUser: (_, __, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);

      return dataSources.userAPI.updateUser();
    },
    uploadProfile: (_, __, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);

      return {
        status: true,
        message: "Todo complete this functino",
      };
    },
  },
  Query: {
    allUsers: (__, { params }, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);

      return dataSources.userAPI.allUsers(params!);
    },
    loggedInUser: (__, args, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);
      return dataSources.userAPI.loggedInUser();
    },
  },
};
