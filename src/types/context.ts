import { FriendRequestAPI } from "../dataSource/friendRequest.api";
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
  };
};
