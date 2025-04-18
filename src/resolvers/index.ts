import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.resolvers";
import { postResolvers } from "./post.resolvers";
import { friendRequestResolvers } from "./friendRequest.resolvers";
import { subscriptionResolvers } from "./subscription.resolvers";
import { chatRoomResolvers } from "./ChatRoom.resolvers";
import { PubSub } from "graphql-subscriptions";
import { messageResolvers } from "./message.resolvers";
export const pubsub = new PubSub();

export const resolvers = mergeResolvers([
  userResolvers,
  postResolvers,
  friendRequestResolvers,
  subscriptionResolvers,
  chatRoomResolvers,
  messageResolvers,
]);
