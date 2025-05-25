import { BaseAPI } from "./index.js";
import { getMessageByRoomId, sendMessage } from "../database/message.query.js";
export class MessageApi extends BaseAPI {
    async sendMessage(body) {
        try {
            const { data, error } = await sendMessage(body);
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
        const { data, error } = await getMessageByRoomId(body);
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
