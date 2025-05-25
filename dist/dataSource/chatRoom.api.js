import { BaseAPI } from "./index.js";
import { getChatRoomByUserId } from "../database/ChatRoom.query.js";
export class ChatRoomApi extends BaseAPI {
    async getChatRoomByUserId(arg) {
        try {
            const { data, error } = await getChatRoomByUserId(arg);
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
