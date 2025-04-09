import { C } from "graphql-ws/dist/common-DY-PBNYy";
import { BaseAPI } from ".";
import {
  deleteSentRequest,
  getFriendRequestByUser,
  getYourSentRequest,
  sendFriendRequest,
} from "../database/friendRequest.query";
import {
  FriendRequest,
  FriendRequestResponse,
  Response,
  SentRequestResponse,
} from "../types/types";
import { GetSentReqParams } from "../types";

export class FriendRequestAPI extends BaseAPI {
  async sendRequest({
    fromId,
    toId,
  }: {
    fromId: string;
    toId: string;
  }): Promise<SentRequestResponse> {
    try {
      const data = await sendFriendRequest(fromId, toId);

      if (!data?.status) throw new Error(data?.message);
      return {
        status: true,
        message: "Friend request sent",
        data,
      };
    } catch (error) {
      return this.handleError<any>(error);
    }
  }

  async acceptFriendRequest(body: any): Promise<Response> {
    try {
      return this.patch<Response>("/", {
        body,
      });
    } catch (error) {
      return this.handleError<any>(error);
    }
  }

  async getFriendRequest(userId: string): Promise<FriendRequestResponse> {
    try {
      const response = await getFriendRequestByUser(userId);
      if (!response?.length)
        throw new Error("You do not have any friend request.");
      return {
        status: true,
        message: "List of friend request",
        data: response,
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
      console.log(await result, "Sent req");
      const length = (await result)?.length;
      if (!length) throw new Error("You  have not sent  any friend request.");
      return {
        status: true,
        message: "List of your sent request",
        count: await count,
        data: await result,
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
      const response = await deleteSentRequest(params);

      if (!response?.status) throw new Error(response.message);
      return {
        status: true,
        message: "Friend request deleted",
        data: response,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
