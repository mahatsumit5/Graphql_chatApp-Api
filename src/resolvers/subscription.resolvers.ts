import { PubSub } from "graphql-subscriptions";
import { Resolvers, Subscription } from "../types/types";
import { pubsub } from ".";
export const subscriptionResolvers: Resolvers = {
  Subscription: {
    newPost: {
      subscribe: () => {
        return pubsub.asyncIterableIterator(["POST_CREATED"]);
      },
    },
  },
};
