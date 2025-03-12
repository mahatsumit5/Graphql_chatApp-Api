"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = void 0;
const user_api_1 = require("../dataSource/user.api");
const friendRequest_api_1 = require("../dataSource/friendRequest.api");
const post_api_1 = require("../dataSource/post.api");
const createContext = async ({ req }, server) => {
    const token = req.headers.authorization;
    const { cache } = server;
    return {
        dataSources: {
            userAPI: new user_api_1.UserAPI({ cache }, token),
            friendReqAPI: new friendRequest_api_1.FriendRequestAPI({ cache }, token),
            postAPI: new post_api_1.PostAPI({ cache }, token),
        },
    };
};
exports.createContext = createContext;
