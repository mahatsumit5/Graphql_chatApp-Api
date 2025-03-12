"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAPI = void 0;
const _1 = require(".");
class PostAPI extends _1.BaseAPI {
    baseURL = `${process.env.BASE_URL}/post/`;
    async createAPost() {
    }
    async getAllPost() {
        try {
            const response = await this.get("");
            return response;
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getPostByUser(userId) {
    }
    async deletePost(postId) {
    }
    async updatePost(postId, postUpdates) {
    }
    async likePost(postId) {
    }
    async unlikePost(postId) {
    }
}
exports.PostAPI = PostAPI;
