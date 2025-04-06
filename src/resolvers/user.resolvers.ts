import { GraphQLError } from "graphql";
import { Resolvers } from "../types/types";
import { ServerErrorCode } from "../utils/formatError";
export const userResolvers: Resolvers = {
  Mutation: {
    logout: (_, { email }, { dataSources }) => {
      return dataSources.userAPI.logout(email);
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
