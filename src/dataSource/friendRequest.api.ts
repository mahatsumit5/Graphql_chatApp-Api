import { C } from "graphql-ws/dist/common-DY-PBNYy";
import { BaseAPI } from ".";
import {
  getFriendRequestByUser,
  getYourSentRequest,
  sendFriendRequest,
} from "../database/friendRequest.query";
import {
  DeleteRequestParams,
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
      console.log(data);
      if (!data?.status) throw new Error("Unable to send friend request");
      return {
        status: true,
        message: "Friend request sent",
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async deleteFriendRequest(
    params: DeleteRequestParams
  ): Promise<SentRequestResponse> {
    try {
      return this.delete<SentRequestResponse>(
        `/${params.fromId}/${params.toId}`
      );
    } catch (error) {
      return this.handleError(error);
    }
  }
  async acceptFriendRequest(body: DeleteRequestParams): Promise<Response> {
    try {
      return this.patch<Response>("/", {
        body,
      });
    } catch (error) {
      return this.handleError(error);
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
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getSentFriendRequest(
    arg: GetSentReqParams
  ): Promise<FriendRequestResponse> {
    try {
      const { count, result } = getYourSentRequest(arg);
      const length = (await result)?.length;
      if (!length) throw new Error("You  have not sent  any friend request.");
      return {
        status: true,
        message: "List of your sent request",
        count: await count,
        data: await result,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
