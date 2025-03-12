"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.friendRequestResolvers = void 0;
exports.friendRequestResolvers = {
    Query: {
        getFriendRequest(_, args, { dataSources }) {
            return dataSources.friendReqAPI.getFriendRequest();
        },
        getSentFriendRequest(_, { queryParams }, { dataSources }) {
            return dataSources.friendReqAPI.getSentFriendRequest(queryParams);
        },
    },
    Mutation: {
        sendRequest(_, { toID }, { dataSources }) {
            return dataSources.friendReqAPI.sendRequest(toID);
        },
        deleteFriendRequest(_, { params }, { dataSources }) {
            return dataSources.friendReqAPI.deleteFriendRequest(params);
        },
        acceptFriendRequest(_, { body }, { dataSources }) {
            return dataSources.friendReqAPI.acceptFriendRequest(body);
        },
    },
};
