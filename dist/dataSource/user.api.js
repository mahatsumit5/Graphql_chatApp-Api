import { BaseAPI } from "./index.js";
import { getAllUsers, getListOfFriends, updateUser, } from "../database/user.query.js";
import { findSessionAndDelete } from "../database/session.query.js";
export class UserAPI extends BaseAPI {
    async allUsers(arg) {
        try {
            const { email } = this.getUser();
            const { totalUsers, users } = await getAllUsers({ ...arg, email });
            if (!users?.length)
                throw new Error("No users found");
            return {
                status: true,
                message: "List of users",
                data: users,
                totalUsers,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async logout(email) {
        try {
            const token = this.getToken();
            const { data: response } = await findSessionAndDelete(token, email);
            if (!response?.userEmail)
                throw new Error("Unable to logout");
            return {
                status: true,
                message: "Logged out successfully",
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async newJwt() {
        try {
            return await this.patch("new-accessJWT", {});
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async updateUser(body) {
        try {
            const user = this.getUser();
            const { data } = await updateUser(user.id, body);
            return {
                status: true,
                message: "User updated successfully",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getListOfFriends() {
        try {
            const user = this.getUser();
            const response = await getListOfFriends(user.id);
            return {
                status: true,
                message: "List of friends",
                data: response,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async loggedInUser() {
        try {
            const user = this.getUser();
            return {
                status: true,
                data: user,
                message: "User details",
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
