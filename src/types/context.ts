import { FriendRequestAPI } from "../dataSource/friendRequest.api";
import { PostAPI } from "../dataSource/post.api";
import { UserAPI } from "../dataSource/user.api";

export type DataSourceContext = {
  dataSources: {
    userAPI: UserAPI;
    friendReqAPI: FriendRequestAPI;
    postAPI: PostAPI;
    isAuthenticated: boolean;
  };
};
