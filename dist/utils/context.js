"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const user_api_1 = require("../dataSource/user.api");
const friendRequest_api_1 = require("../dataSource/friendRequest.api");
const post_api_1 = require("../dataSource/post.api");
const chatRoom_api_1 = require("../dataSource/chatRoom.api");
const message_api_1 = require("../dataSource/message.api");
const __1 = require("..");
const comment_api_1 = require("../dataSource/comment.api");
const createContext = async ({ req, res }, server) => {
    try {
        const user = req.userInfo;
        const headerToken = req.headers.authorization || "";
        const token = headerToken.split(" ")[1];
        const { cache } = server;
        return {
            pubsub: __1.pubsub,
            dataSources: {
                userAPI: new user_api_1.UserAPI({ cache }, user, token),
                friendReqAPI: new friendRequest_api_1.FriendRequestAPI({ cache }, user, token),
                user,
                postAPI: new post_api_1.PostAPI({ cache }, user, token),
                chatRoom: new chatRoom_api_1.ChatRoomApi({ cache }, user, token),
                message: new message_api_1.MessageApi({ cache }, user, token),
                commentApi: new comment_api_1.CommentAPI({ cache }, user, token),
            },
        };
    }
    catch (error) {
        return {
            dataSources: {},
        };
    }
};
exports.createContext = createContext;
