import { Resolvers } from "../types/types";
import { PubSub } from "graphql-subscriptions";

export const pubsub = new PubSub();
export const SubscriptionResolver: Resolvers = {
  Subscription: {
    newPost: {
      subscribe: (_, args, { dataSources }) => {
        return pubsub.asyncIterableIterator("POST_CREATED");
      },
    },
    newMessage: {
      subscribe: (_, args, { dataSources }) => {
        return pubsub.asyncIterableIterator("MESSAGE_CREATED");
      },
    },
  },
};
