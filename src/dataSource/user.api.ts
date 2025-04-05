import { AugmentedRequest, RESTDataSource } from "@apollo/datasource-rest";
import {
  AllUser,
  AllUsersResponse,
  LogInResponse,
  Response,
  SignInMutation,
  SignInMutationVariables,
  SignUpResponse,
  SignUpUserParams,
} from "../types/types";
import { BaseAPI } from ".";
import { createUser, getUserByEmail } from "../database/user.query";
import {
  comparePassword,
  createAuth0Token,
  hashPass,
  sendResponse,
} from "../utils";
import { createSession, getSession } from "../database/session.query";
export class UserAPI extends BaseAPI {
  async signUp(input: SignUpUserParams): Promise<SignUpResponse> {
    try {
      input.password = hashPass(input.password);
      const response = await createUser(input);
      if (
        !response?.id &&
        response?.message?.includes("Unique constraint failed")
      ) {
        throw new Error("Email already exist");
      } else {
        return {
          response: {
            status: true,
            message: "Account Created",
          },
          data: response,
        };
      }
    } catch (error) {
      return {
        response: this.handleError(error),
      };
    }
  }
  async signIn(input: SignInMutationVariables): Promise<SignInMutation> {
    try {
      const user = await getUserByEmail(input.email);
      if (!user?.id) throw new Error("User not found with this email");
      const doesPasswordMatch = comparePassword(input.password, user.password);
      if (doesPasswordMatch) {
        const token = await createAuth0Token();
        if (!token?.access_token) throw new Error("Unable to create token");
        await createSession({ email: user.email, token: token.access_token });
        return sendResponse(true, "Welcome back", {
          accessJWT: token.access_token,
        });
      } else {
        throw new Error("Password incorrect");
      }
    } catch (error) {
      return {
        response: this.handleError(error),
      };
    }
  }

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

  async loggedInUser(): Promise<LogInResponse> {
    try {
      const token = this.getToken();
      const response = await getSession(token);
      console.log(response?.associate);
      if (!response?.associate) throw new Error("User not found");
      return sendResponse(true, "Welcome back", response.associate);
    } catch (error) {
      return {
        response: this.handleError(error),
      };
    }
  }
  async logout(): Promise<Response> {
    try {
      return await this.post("logout");
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
  async resetPassword(password: string): Promise<Response> {
    try {
      return await this.put("reset-password", {
        body: { password },
      });
    } catch (error) {
      return this.handleError(error);
      throw error;
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
