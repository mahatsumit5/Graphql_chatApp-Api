import { BaseAPI } from ".";
import { getChatRoomByUserId } from "../database/ChatRoom.query";
import { GetChatRoomParams } from "../types";
import { GetChatRoomResponse, Message, User } from "../types/types";
type ChatRoomResponse = {
  id: string;
  joinedBy: User;
  createdBy: User;
  messages: Array<Message>;
  unseenMessages: number;
  _count: {};
};
export class ChatRoomApi extends BaseAPI {
  async getChatRoomByUserId(
    arg: GetChatRoomParams
  ): Promise<GetChatRoomResponse> {
    try {
      // const res = await getChatRoomByUserId(arg);
      const room = await getChatRoomByUserId(arg);
      if (!room?.length) throw new Error(room.error || "No chat rooms found");

      const chatRooms = room.map((room: ChatRoomResponse) => ({
        id: room.id,
        userId:
          arg.userId === room.createdBy.id
            ? room.joinedBy.id
            : room.createdBy.id,

        fName:
          arg.userId === room.createdBy.id
            ? room.joinedBy.fName
            : room.createdBy.fName,
        lName:
          arg.userId === room.createdBy.id
            ? room.joinedBy.lName
            : room.createdBy.lName,
        profile:
          arg.userId === room.createdBy.id
            ? room.joinedBy.profile
            : room.createdBy.profile,
        email:
          arg.userId === room.createdBy.id
            ? room.joinedBy.email
            : room.createdBy.email,
        isActive:
          arg.userId === room.createdBy.id
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
    } catch (error) {
      return this.handleError(error);
    }
  }
}
