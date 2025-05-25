import { PubSub } from "graphql-subscriptions";
import { Resolvers, User } from "../types/types.js";

export const subscriptionResolver: Resolvers = {
  Subscription: {
    newPost: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterableIterator("POST_CREATED"),
    },
    newMessageReceived: {
      subscribe: (parent, { yourUserId }, { pubsub }) =>
        pubsub.asyncIterableIterator([`SEND_MESSAGE_TO_${yourUserId}`]),
    },
    messageInRoom: {
      subscribe: (parent, { roomId }, { pubsub }) => {
        console.log("this is roomid", roomId);
        return pubsub.asyncIterableIterator([`MESSAGE_CREATED_${roomId}`]);
      },
    },
    onlineUsers: {
      subscribe: (parent, args, { pubsub }) =>
        pubsub.asyncIterableIterator("ONLINE_USERS"),
      resolve: (payload: { onlineUsers: User[] }) => payload.onlineUsers,
    },
  },
};
