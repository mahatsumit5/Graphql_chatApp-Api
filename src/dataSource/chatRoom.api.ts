import { BaseAPI } from ".";
import { getChatRoom, getChatRoomByUserId } from "../database/ChatRoom.query";
import { GetChatRoomParams } from "../types";
import { ChatRoom, GetChatRoomResponse, Message, User } from "../types/types";
type ChatRoomResponse = {
  id: string;
  members: Array<{ user: User }>;
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
      const { rooms: res, count } = await getChatRoom(arg);

      console.log(res[0].messages);
      if (!res?.length) throw new Error(res.error || "No chat rooms found");

      const chatRooms = res.map((room: ChatRoomResponse) => ({
        id: room.id,
        userId: room.members[0].user.id,

        fName: room.members[0].user.fName,
        lName: room.members[0].user.lName,
        profile: room.members[0].user.profile,
        email: room.members[0].user.email,
        isActive: room.members[0].user.isActive,
        lastMessage: room.messages[0]?.content || "",
        isLastMessageSeen: room.messages[0]?.isSeen || false,
        lastmessageAuthor: room.messages[0]?.author || "",
        unSeenMessageCount: count,
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
