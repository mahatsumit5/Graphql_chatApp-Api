import { BaseAPI } from ".";
import {
  getFriendRequestByUser,
  sendFriendRequest,
} from "../database/friendRequest.query";
import {
  DeleteRequestParams,
  FriendRequestResponse,
  QueryParamsSentReq,
  Response,
  SentRequestResponse,
} from "../types/types";

export class FriendRequestAPI extends BaseAPI {
  override baseURL = `${process.env.BASE_URL}/friend/`;

  async sendRequest({
    fromId,
    toId,
  }: {
    fromId: string;
    toId: string;
  }): Promise<SentRequestResponse> {
    try {
      const response = await sendFriendRequest(fromId, toId);

      return {
        status: true,
        message: "",
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
      if (!response.id) throw new Error("Unable to get friend request");
      return {
        status: true,
        message: "List of friend request",
        data: response,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getSentFriendRequest({ page, search, take }: QueryParamsSentReq) {
    return this.get(`sent-request?page=${page}&search=${search}&take=${take}`);
  }
}
