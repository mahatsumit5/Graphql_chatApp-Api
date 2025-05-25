import { UserAPI } from "../dataSource/user.api.js";
import { FriendRequestAPI } from "../dataSource/friendRequest.api.js";
import { PostAPI } from "../dataSource/post.api.js";
import { ChatRoomApi } from "../dataSource/chatRoom.api.js";
import { MessageApi } from "../dataSource/message.api.js";
import { pubsub } from "../index.js";
import { CommentAPI } from "../dataSource/comment.api.js";
export const createContext = async ({ req, res }, server) => {
    try {
        const user = req.userInfo;
        const headerToken = req.headers.authorization || "";
        const token = headerToken.split(" ")[1];
        const { cache } = server;
        return {
            pubsub,
            dataSources: {
                userAPI: new UserAPI({ cache }, user, token),
                friendReqAPI: new FriendRequestAPI({ cache }, user, token),
                user,
                postAPI: new PostAPI({ cache }, user, token),
                chatRoom: new ChatRoomApi({ cache }, user, token),
                message: new MessageApi({ cache }, user, token),
                commentApi: new CommentAPI({ cache }, user, token),
            },
        };
    }
    catch (error) {
        return {
            dataSources: {},
        };
    }
};
