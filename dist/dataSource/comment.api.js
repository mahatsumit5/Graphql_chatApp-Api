"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentAPI = void 0;
const _1 = require(".");
const comment_query_1 = require("../database/comment.query");
class CommentAPI extends _1.BaseAPI {
    async postComment(arg) {
        try {
            const { data, error } = await (0, comment_query_1.postComment)(arg);
            if (!data || error)
                throw new Error(error.message || "Unable to create a new comment");
            return {
                status: true,
                message: "Comments fetched successfully",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getCommentByPostId(postId) {
        try {
            const { data, error } = await (0, comment_query_1.getCommentsByPostId)(postId);
            if (!data || error)
                throw new Error(error.message || "Unable to fetch comments");
            return {
                status: true,
                message: "Comments fetched successfully",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async deleteComment(id) {
        try {
            const { data, error } = await (0, comment_query_1.deleteComment)(id);
            if (!data || error)
                throw new Error(error.message || "Unable to delete comment");
            return {
                status: true,
                message: "Comment deleted successfully",
                data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
exports.CommentAPI = CommentAPI;
