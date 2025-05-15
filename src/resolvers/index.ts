import { mergeResolvers } from "@graphql-tools/merge";
import { userResolver } from "./user.resolver";
import { postResolver } from "./post.resolver";
import { friendRequestResolver } from "./friendRequest.resolver";
import { subscriptionResolver } from "./subscription.resolver";
import { chatRoomResolver } from "./ChatRoom.resolver";
import { messageResolver } from "./message.resolver";
import { commentResolver } from "./comment.resolver";

export const resolvers = mergeResolvers([
  userResolver,
  postResolver,
  friendRequestResolver,
  subscriptionResolver,
  chatRoomResolver,
  messageResolver,
  commentResolver,
]);
