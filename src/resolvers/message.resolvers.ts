import { Resolvers } from "../types/types";

export const messageResolvers: Resolvers = {
  Mutation: {
    sendMessage: (_, args, { dataSources }) => {
      return dataSources.message.sendMessage(args);
    },
  },

  Query: {
    getMessagesByRoomId: (_, { input }, { dataSources }) => {
      return dataSources.message.getMessages(input);
    },
  },
};
