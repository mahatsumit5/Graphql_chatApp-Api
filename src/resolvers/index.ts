import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.resolvers";
import { postResolvers } from "./post.resolvers";
import { friendRequestResolvers } from "./friendRequest.resolvers";
import { subscriptionResolvers } from "./subscription.resolvers";
import { PubSub } from "graphql-subscriptions";
export const pubsub = new PubSub();

export const resolvers = mergeResolvers([
  userResolvers,
  postResolvers,
  friendRequestResolvers,
  subscriptionResolvers,
]);
