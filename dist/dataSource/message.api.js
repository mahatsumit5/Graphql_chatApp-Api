"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageApi = void 0;
const _1 = require(".");
class MessageApi extends _1.BaseAPI {
    baseURL = `${process.env.BASE_URL}/message/`;
    async sendMessage(body) {
        return this.post("/", {
            body,
        });
    }
    async getMessages({ roomId, skip, take, }) {
        return this.get(`/?id=${roomId}&take=${take}&skip=${skip}`);
    }
    async deleteMessage(messageId) {
    }
}
exports.MessageApi = MessageApi;
