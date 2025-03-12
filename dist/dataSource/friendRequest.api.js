"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendRequestAPI = void 0;
const _1 = require(".");
class FriendRequestAPI extends _1.BaseAPI {
    baseURL = `${process.env.BASE_URL}/friend/`;
    async sendRequest(to) {
        try {
            return this.post("send-request", {
                body: {
                    to,
                },
            });
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async deleteFriendRequest(params) {
        try {
            return this.delete(`/${params.fromId}/${params.toId}`);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async acceptFriendRequest(body) {
        try {
            return this.patch("/", {
                body,
            });
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getFriendRequest() {
        return this.get("/friend-request");
    }
    async getSentFriendRequest({ page, search, take }) {
        return this.get(`sent-request?page=${page}&search=${search}&take=${take}`);
    }
}
exports.FriendRequestAPI = FriendRequestAPI;
