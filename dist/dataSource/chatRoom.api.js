"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoomApi = void 0;
const _1 = require(".");
const ChatRoom_query_1 = require("../database/ChatRoom.query");
class ChatRoomApi extends _1.BaseAPI {
    async getChatRoomByUserId(arg) {
        try {
            const { data, error } = await (0, ChatRoom_query_1.getChatRoomByUserId)(arg);
            if (!data?.length)
                throw new Error(error.message || "No chat rooms found");
            const chatRooms = data.map((room) => ({
                id: room.id,
                userId: arg.userId === room.createdBy.id
                    ? room.joinedBy.id
                    : room.createdBy.id,
                fName: arg.userId === room.createdBy.id
                    ? room.joinedBy.fName
                    : room.createdBy.fName,
                lName: arg.userId === room.createdBy.id
                    ? room.joinedBy.lName
                    : room.createdBy.lName,
                profile: arg.userId === room.createdBy.id
                    ? room.joinedBy.profile
                    : room.createdBy.profile,
                email: arg.userId === room.createdBy.id
                    ? room.joinedBy.email
                    : room.createdBy.email,
                isActive: arg.userId === room.createdBy.id
                    ? room.joinedBy.isActive
                    : room.createdBy.isActive,
                lastMessage: room.messages[0]?.content || "",
                isLastMessageSeen: room.messages[0]?.isSeen || false,
                lastmessageAuthor: room.messages[0]?.author || "",
                unSeenMessageCount: 0,
            }));
            return {
                status: true,
                message: "Chat rooms fetched successfully",
                data: chatRooms,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
exports.ChatRoomApi = ChatRoomApi;
