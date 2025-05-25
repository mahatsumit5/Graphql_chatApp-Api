"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostAPI = void 0;
const _1 = require(".");
const post_query_1 = require("../database/post.query");
const redis_1 = require("../redis");
const postLike_query_1 = require("../database/postLike.query");
class PostAPI extends _1.BaseAPI {
    async createAPost(arg) {
        try {
            const { data, error } = await (0, post_query_1.createPost)(arg);
            if (!data.id)
                throw new Error("Unable to create a post");
            return {
                status: true,
                message: "sucessfull",
                result: data,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async getAllPost(arg) {
        const key = `post-${arg.page}-${arg.userId}-${arg.take}`;
        const expiry = 1;
        try {
            const posts = await (0, redis_1.getOrSetCache)(key, expiry, async () => await (0, post_query_1.getAllPost)(arg));
            const { data: count, error } = await (0, post_query_1.countTotalPost)();
            if (error)
                throw new Error(error.message);
            if (!count)
                throw new Error("No posts found");
            return {
                posts: posts,
                message: "Posts retrieved successfully",
                status: true,
                totalNumberOfPosts: count,
            };
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
        try {
            const { id } = this.getUser();
            const { data, error } = await (0, postLike_query_1.likePost)(id, postId);
            if (error)
                throw new Error(error.message);
            return {
                status: true,
                message: "You liked this post",
                likedPost: data.postId,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
    async unlikePost(postId) {
        try {
            const user = this.getUser();
            const { data, error } = await (0, postLike_query_1.removeLike)(postId, user.id);
            if (error)
                throw new Error(error.message);
            return {
                status: true,
                message: "like removed",
                data: data.postId,
            };
        }
        catch (error) {
            return this.handleError(error);
        }
    }
}
exports.PostAPI = PostAPI;
