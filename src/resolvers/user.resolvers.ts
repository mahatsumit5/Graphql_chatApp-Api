import { GraphQLError } from "graphql";
import { Resolvers } from "../types/types";
import { ServerErrorCode } from "../utils/formatError";
import { hashPass } from "../utils";
export const userResolvers: Resolvers = {
  Mutation: {
    logout: (_, { email }, { dataSources }) => {
      return dataSources.userAPI.logout(email);
    },

    updateUser: (_, args, { dataSources }) => {
      const id = dataSources.user.id;
      if (args?.password) {
        args.password = hashPass(args.password);
      }
      return dataSources.userAPI.updateUser(id, args);
    },
  },
  Query: {
    allUsers: (__, { params }, { dataSources }) => {
      return dataSources.userAPI.allUsers({
        email: dataSources.user.email,
        ...params,
      });
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
    allFriends: (__, _, { dataSources }) => {
      if (!dataSources.user.id)
        throw new GraphQLError(
          "You are not authorized to perform this action.",
          {
            extensions: {
              code: ServerErrorCode.FORBIDDEN,
            },
          }
        );
      const { id } = dataSources.user;
      return dataSources.userAPI.getListOfFriends(id);
    },
  },
};
