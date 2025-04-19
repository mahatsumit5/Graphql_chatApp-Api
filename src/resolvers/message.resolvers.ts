import { Resolvers } from "../types/types";
import { pubsub } from "..";
export const messageResolvers: Resolvers = {
  Mutation: {
    sendMessage: async (_, args, { dataSources }) => {
      const response = await dataSources.message.sendMessage(args);
      if (response?.status) {
        const data = await pubsub.publish(`MESSAGE_CREATED_${args.roomId}`, {
          newMessage: response.data,
        });
        console.log("Message sent", data);
      }

      return response;
    },
  },

  Query: {
    getMessagesByRoomId: (_, { input }, { dataSources }) => {
      return dataSources.message.getMessages(input);
    },
  },
};
