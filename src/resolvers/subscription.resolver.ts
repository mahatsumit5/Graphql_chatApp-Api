import { PubSub } from "graphql-subscriptions";
import { Resolvers } from "../types/types";

export const subscriptionResolver: Resolvers = {
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }) => {
        return pubsub.asyncIterableIterator("POST_CREATED");
      },
    },
    newMessageReceived: {
      subscribe: (parent, { yourUserId }, { pubsub }) => {
        return pubsub.asyncIterableIterator([`SEND_MESSAGE_TO_${yourUserId}`]);
      },
    },
    messageInRoom: {
      subscribe: (parent, { roomId }, { pubsub }) => {
        console.log("this is roomid", roomId);
        return pubsub.asyncIterableIterator([`MESSAGE_CREATED_${roomId}`]);
      },
    },
  },
};
