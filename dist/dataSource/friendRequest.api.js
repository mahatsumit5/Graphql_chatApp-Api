"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestAPI = void 0;
const _1 = require(".");
const friendRequest_query_1 = require("../database/friendRequest.query");
const ChatRoom_query_1 = require("../database/ChatRoom.query");
class FriendRequestAPI extends _1.BaseAPI {
    async sendRequest({ fromId, toId, }) {
        try {
            const { data, error } = await (0, friendRequest_query_1.sendFriendRequest)(fromId, toId);
            if (error)
                throw new Error(error.message);
            return {
                status: true,
                message: "Friend request sent",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async acceptFriendRequest({ fromId, toId, }) {
        try {
            const [response] = await Promise.all([
                (0, ChatRoom_query_1.createChatRoom)(fromId, toId),
                (0, friendRequest_query_1.deleteSentRequest)({ fromId, toId }),
            ]);
            if (response.error)
                throw new Error(response.error.message);
            return {
                status: true,
                message: "Request accepted",
                data: response.data.id,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getFriendRequest(userId) {
        try {
            const { data, error } = await (0, friendRequest_query_1.getFriendRequestByUser)(userId);
            if (!data?.length)
                throw new Error("You do not have any friend request.");
            return {
                status: true,
                message: "List of friend request",
                data,
                count: 0,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getSentFriendRequest(arg) {
        try {
            const { count, result } = (0, friendRequest_query_1.getYourSentRequest)(arg);
            const { error } = await result;
            if (error)
                throw new Error(error.message);
            return {
                status: true,
                message: "List of your sent request",
                count: (await count).data,
                data: (await result).data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async deleteFriendRequest(params) {
        try {
            const { data, error } = await (0, friendRequest_query_1.deleteSentRequest)(params);
            if (error)
                throw new Error(error.message);
            return {
                status: true,
                message: "Friend request deleted",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
exports.FriendRequestAPI = FriendRequestAPI;
