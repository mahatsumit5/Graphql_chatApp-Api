"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAPI = void 0;
const _1 = require(".");
class UserAPI extends _1.BaseAPI {
    baseURL = `http://localhost:8080/api/v1/user/`;
    async signUp(input) {
        try {
            const response = await this.post("sign-up", {
                body: input,
            });
            return response;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async signIn(input) {
        try {
            console.log(input, "input in data source");
            return await this.post("sign-in", {
                body: input,
            });
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async allUsers({ order, page, take, search, }) {
        try {
            return await this.get(`all-users?order=${order}&page=${page}&take=${take}&search=${search}`);
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async loggedInUser() {
        try {
            return await this.get("loggedin");
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async logout() {
        try {
            return await this.post("logout");
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
    async resetPassword(password) {
        try {
            return await this.put("reset-password", {
                body: { password },
            });
        }
        catch (error) {
            return this.handleError(error);
            throw error;
        }
    }
    async updateUser() {
        try {
            return await this.post("logout");
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
exports.UserAPI = UserAPI;
