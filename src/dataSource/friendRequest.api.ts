import { C } from "graphql-ws/dist/common-DY-PBNYy";
import { BaseAPI } from ".";
import {
  deleteSentRequest,
  getFriendRequestByUser,
  getYourSentRequest,
  sendFriendRequest,
} from "../database/friendRequest.query";
import {
  CreateChatRoomResponse,
  FriendRequest,
  FriendRequestResponse,
  Response,
  SentRequestResponse,
} from "../types/types";
import { GetSentReqParams } from "../types";
import { createChatRoom } from "../database/ChatRoom.query";

export class FriendRequestAPI extends BaseAPI {
  async sendRequest({
    fromId,
    toId,
  }: {
    fromId: string;
    toId: string;
  }): Promise<SentRequestResponse> {
    try {
      const { data, error } = await sendFriendRequest(fromId, toId);

      if (error) throw new Error(error.message);
      return {
        status: true,
        message: "Friend request sent",
        data,
      };
    } catch (error) {
      return this.handleError<any>(error);
    }
  }

  async acceptFriendRequest({
    fromId,
    toId,
  }: {
    fromId: string;
    toId: string;
  }): Promise<CreateChatRoomResponse> {
    try {
      const [response] = await Promise.all([
        createChatRoom(fromId, toId),
        deleteSentRequest({ fromId, toId }),
      ]);
      if (response.error) throw new Error(response.error.message);
      return {
        status: true,
        message: "Request accepted",
        data: response.data.id,
      };
    } catch (error) {
      return this.handleError<any>(error);
    }
  }

  async getFriendRequest(userId: string): Promise<FriendRequestResponse> {
    try {
      const { data, error } = await getFriendRequestByUser(userId);
      if (!data?.length) throw new Error("You do not have any friend request.");
      return {
        status: true,
        message: "List of friend request",
        data,
        count: 0,
      };
    } catch (error) {
      return this.handleError<[]>(error);
    }
  }
  async getSentFriendRequest(
    arg: GetSentReqParams
  ): Promise<FriendRequestResponse> {
    try {
      const { count, result } = getYourSentRequest(arg);
      const { error } = await result;
      if (error) throw new Error(error.message);
      return {
        status: true,
        message: "List of your sent request",
        count: (await count).data,
        data: (await result).data,
      };
    } catch (error) {
      return this.handleError<[]>(error);
    }
  }

  async deleteFriendRequest(params: {
    fromId: string;
    toId: string;
  }): Promise<SentRequestResponse> {
    try {
      const { data, error } = await deleteSentRequest(params);

      if (error) throw new Error(error.message);
      return {
        status: true,
        message: "Friend request deleted",
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
