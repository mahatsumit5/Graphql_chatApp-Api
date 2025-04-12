import { BaseAPI } from ".";
import { getChatRoom } from "../database/ChatRoom.query";
import { GetChatRoomParams } from "../types";
import { GetChatRoomResponse, QueryGetAllChatRoomsArgs } from "../types/types";

export class ChatRoomApi extends BaseAPI {
  async getChatRoomByUserId(
    arg: GetChatRoomParams
  ): Promise<GetChatRoomResponse> {
    try {
      const res = await getChatRoom(arg);
      if (!res?.length) throw new Error(res.error || "No chat rooms found");
      return {
        status: true,
        message: "Chat rooms fetched successfully",
        data: res,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
