import { mergeResolvers } from "@graphql-tools/merge";
import { userResolvers } from "./user.resolvers";
import { postResolvers } from "./post.resolvers";
import { friendRequestResolvers } from "./friendRequest.resolvers";
import { subscriptionResolver } from "./subscription.resolver";
import { chatRoomResolvers } from "./ChatRoom.resolvers";
import { messageResolvers } from "./message.resolvers";

export const resolvers = mergeResolvers([
  userResolvers,
  postResolvers,
  friendRequestResolvers,
  subscriptionResolver,
  chatRoomResolvers,
  messageResolvers,
]);
