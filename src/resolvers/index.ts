import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user.resolver.js";
import { postResolver } from "./post.resolver.js";
import { friendRequestResolver } from "./friendRequest.resolver.js";
import { subscriptionResolver } from "./subscription.resolver.js";
import { chatRoomResolver } from "./ChatRoom.resolver.js";
import { messageResolver } from "./message.resolver.js";
import { commentResolver } from "./comment.resolver.js";

export const resolvers = mergeResolvers([
  userResolver,
  postResolver,
  friendRequestResolver,
  subscriptionResolver,
  chatRoomResolver,
  messageResolver,
  commentResolver,
]);
