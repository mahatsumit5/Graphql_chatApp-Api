import {
  AllUser,
  AllUsersResponse,
  LoggedInUserResponse,
  Response,
} from "../types/types";
import { BaseAPI } from ".";
import { createUser, getUserByEmail } from "../database/user.query";
import {
  comparePassword,
  createAuth0Token,
  hashPass,
  sendResponse,
} from "../utils";
import {
  createSession,
  findSessionAndDelete,
  getSession,
} from "../database/session.query";
export class UserAPI extends BaseAPI {
  async allUsers({
    order,
    page,
    take,
    search,
  }: AllUser): Promise<AllUsersResponse> {
    try {
      return await this.get<AllUsersResponse>(
        `all-users?order=${order}&page=${page}&take=${take}&search=${search}`
      );
    } catch (error) {
      return this.handleError(error);
    }
  }

  async logout(email: string): Promise<Response> {
    try {
      const token = this.getToken();
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

  async updateUser(): Promise<Response> {
    try {
      return await this.post("logout");
    } catch (error) {
      return this.handleError(error);
    }
  }
}
