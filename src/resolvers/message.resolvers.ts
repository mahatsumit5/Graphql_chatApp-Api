import { Resolvers } from "../types/types";
import { pubsub } from "./subscription.resolver";

export const messageResolvers: Resolvers = {
  Mutation: {
    sendMessage: (_, args, { dataSources }) => {
      pubsub.publish("POST_CREATED", { postCreated: args });
      return dataSources.message.sendMessage(args);
    },
  },

  Query: {
    getMessagesByRoomId: (_, { input }, { dataSources }) => {
      return dataSources.message.getMessages(input);
    },
  },
};
