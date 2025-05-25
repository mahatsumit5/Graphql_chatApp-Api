"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageApi = void 0;
const _1 = require(".");
const message_query_1 = require("../database/message.query");
class MessageApi extends _1.BaseAPI {
    async sendMessage(body) {
        try {
            const { data, error } = await (0, message_query_1.sendMessage)(body);
            if (error)
                throw new Error(error?.message || "Failed to send message");
            return {
                status: true,
                message: "Message sent successfully",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getMessages(body) {
        const { data, error } = await (0, message_query_1.getMessageByRoomId)(body);
        if (error)
            throw new Error(error.message);
        return {
            status: true,
            message: "Messages retrieved successfully",
            data: data.messages.reverse(),
            _count: data._count.messages,
        };
    }
    async deleteMessage(messageId) {
    }
}
exports.MessageApi = MessageApi;
