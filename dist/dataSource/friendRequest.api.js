import { BaseAPI } from "./index.js";
import { deleteSentRequest, getFriendRequestByUser, getYourSentRequest, sendFriendRequest, } from "../database/friendRequest.query.js";
import { createChatRoom } from "../database/ChatRoom.query.js";
export class FriendRequestAPI extends BaseAPI {
    async sendRequest({ fromId, toId, }) {
        try {
            const { data, error } = await sendFriendRequest(fromId, toId);
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
                createChatRoom(fromId, toId),
                deleteSentRequest({ fromId, toId }),
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
            const { data, error } = await getFriendRequestByUser(userId);
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
            const { count, result } = getYourSentRequest(arg);
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
            const { data, error } = await deleteSentRequest(params);
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
