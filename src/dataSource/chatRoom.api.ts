import { BaseAPI } from ".";
import { getChatRoomByUserId } from "../database/ChatRoom.query";
import { GetChatRoomParams } from "../types";
import { ChatRoom, GetChatRoomResponse, Message, User } from "../types/types";
type ChatRoomResponse = {
  id: string;
  joinedBy: User;
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
      console.log(room, "room");
      if (!room?.length) throw new Error(room.error || "No chat rooms found");

      const chatRooms = room.map((room: ChatRoomResponse) => ({
        id: room.id,
        userId: room.joinedBy.id,

        fName: room.joinedBy.fName,
        lName: room.joinedBy.lName,
        profile: room.joinedBy.profile,
        email: room.joinedBy.email,
        isActive: room.joinedBy.isActive,
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
