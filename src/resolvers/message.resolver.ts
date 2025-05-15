import { Resolvers } from "../types/types";
import { pubsub } from "..";
export const messageResolver: Resolvers = {
  Mutation: {
    sendMessage: async (_, args, { dataSources }) => {
      const response = await dataSources.message.sendMessage(args);
      if (response?.status) {
        // Publish the message to the room's subscription channel
        pubsub.publish(`MESSAGE_CREATED_${args.roomId}`, {
          messageInRoom: response.data,
        });
        pubsub.publish(`SEND_MESSAGE_TO_${args.receiverId}`, {
          newMessageReceived: response.data,
        });
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
