import { PubSub } from "graphql-subscriptions";
import { ChatRoomApi } from "../dataSource/chatRoom.api.js";
import { FriendRequestAPI } from "../dataSource/friendRequest.api.js";
import { MessageApi } from "../dataSource/message.api.js";
import { PostAPI } from "../dataSource/post.api.js";
import { UserAPI } from "../dataSource/user.api.js";
import { User } from "./types.js";
import { CommentAPI } from "../dataSource/comment.api.js";

export type DataSourceContext = {
  pubsub: PubSub<Record<string, never>>;

  dataSources: {
    userAPI: UserAPI;
    friendReqAPI: FriendRequestAPI;
    postAPI: PostAPI;
    isAuthenticated: boolean;
    user: User;
    chatRoom: ChatRoomApi;
    message: MessageApi;
    commentApi: CommentAPI;
  } | null;
};
