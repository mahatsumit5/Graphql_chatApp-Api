import { GraphQLError } from "graphql";
import { Resolvers, SignInParams, SignUpUserParams } from "../types/types";
import { ServerErrorCode } from "../utils/formatError";
export const userResolvers: Resolvers = {
  Mutation: {
    signUp: async (parent, { input }, { dataSources }) => {
      return await dataSources.userAPI.signUp(input as SignUpUserParams);
    },
    signIn: (parent, { input }, { dataSources }) => {
      return dataSources.userAPI.signIn(input as SignInParams);
    },
    logout: (_, { email }, { dataSources }) => {
      return dataSources.userAPI.logout(email);
    },
    resetPassword: (_, { newPassword }, { dataSources }) => {
      return dataSources.userAPI.resetPassword(newPassword);
    },
    newJwt: (_, __, { dataSources }) => {
      return dataSources.userAPI.newJwt();
    },
    updateUser: (_, __, { dataSources }) => {
      return dataSources.userAPI.updateUser();
    },
    uploadProfile: (_, __, { dataSources }) => {
      return {
        status: true,
        message: "Todo complete this functino",
      };
    },
  },
  Query: {
    allUsers: (__, { params }, { dataSources }) => {
      return dataSources.userAPI.allUsers(params!);
    },
    loggedInUser: (__, args, { dataSources }) => {
      if (!dataSources.user.id)
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: ServerErrorCode.FORBIDDEN,
            },
          }
        );
      return {
        status: true,
        message: "Here is your data",
        data: dataSources.user,
      };
    },
  },
};
