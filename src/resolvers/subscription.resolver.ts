import { PubSub } from "graphql-subscriptions";
import { Resolvers } from "../types/types";

export const subscriptionResolver: Resolvers = {
  Subscription: {
    newPost: {
      subscribe: (parent, args, { dataSources }) => {
        return dataSources.pubsub.asyncIterableIterator("POST_CREATED");
      },
    },
    newMessage: {
      subscribe: (parent, args, { dataSources }) => {
        return dataSources.pubsub.asyncIterableIterator(["MESSAGE_CREATED"]);
      },
    },
    messageInRoom: {
      subscribe: (parent, { roomId }, { dataSources }) => {
        return dataSources.pubsub.asyncIterableIterator(
          `MESSAGE_CREATED_${roomId}`
        );
      },
    },
  },
};
