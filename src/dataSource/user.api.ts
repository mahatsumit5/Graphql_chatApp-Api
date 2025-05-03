import {
  AllUser,
  AllUsersResponse,
  Response,
  UpdateUserResponse,
} from "../types/types";
import { BaseAPI } from ".";
import {
  getAllUsers,
  getListOfFriends,
  updateUser,
} from "../database/user.query";

import { findSessionAndDelete } from "../database/session.query";

export class UserAPI extends BaseAPI {
  async allUsers(arg: AllUser & { email: string }): Promise<AllUsersResponse> {
    try {
      arg;
      const { totalUsers, users } = await getAllUsers(arg);
      if (!users?.length) throw new Error("No users found");
      return {
        status: true,
        message: "List of users",
        data: users,
        totalUsers,
      };
    } catch (error) {
      return this.handleError<[]>(error);
    }
  }

  async logout(email: string): Promise<Response> {
    try {
      const token = this.getToken();
      console.log("this is token", token);
      const response = await findSessionAndDelete(token, email);
      if (!response?.userEmail) throw new Error("Unable to logout");
      return {
        status: true,
        message: "Logged out successfully",
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async newJwt(): Promise<Response> {
    try {
      return await this.patch("new-accessJWT", {});
    } catch (error) {
      return this.handleError(error);
    }
  }

  async updateUser(id: string, body: unknown): Promise<UpdateUserResponse> {
    try {
      const data = await updateUser(id, body);
      return {
        status: true,
        message: "User updated successfully",
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async getListOfFriends(userId: string): Promise<AllUsersResponse> {
    try {
      const response = await getListOfFriends(userId);
      return {
        status: true,
        message: "List of friends",
        data: response,
      };
    } catch (error) {
      return this.handleError<[]>(error);
    }
  }
}
