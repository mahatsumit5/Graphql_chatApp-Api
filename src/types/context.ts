import { PubSub } from "graphql-subscriptions";
import { ChatRoomApi } from "../dataSource/chatRoom.api";
import { FriendRequestAPI } from "../dataSource/friendRequest.api";
import { MessageApi } from "../dataSource/message.api";
import { PostAPI } from "../dataSource/post.api";
import { UserAPI } from "../dataSource/user.api";
import { User } from "./types";

export type DataSourceContext = {
  dataSources: {
    userAPI: UserAPI;
    friendReqAPI: FriendRequestAPI;
    postAPI: PostAPI;
    isAuthenticated: boolean;
    user: User;
    chatRoom: ChatRoomApi;
    message: MessageApi;
    pubsub: PubSub<Record<string, never>>;
  } | null;
};
