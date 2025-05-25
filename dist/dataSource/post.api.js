import { BaseAPI } from "./index.js";
import { countTotalPost, createPost, getAllPost, } from "../database/post.query.js";
import { getOrSetCache } from "../redis/index.js";
import { likePost, removeLike } from "../database/postLike.query.js";
export class PostAPI extends BaseAPI {
    async createAPost(arg) {
        try {
            const { data, error } = await createPost(arg);
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
            const posts = await getOrSetCache(key, expiry, async () => await getAllPost(arg));
            const { data: count, error } = await countTotalPost();
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
            const { data, error } = await likePost(id, postId);
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
            const { data, error } = await removeLike(postId, user.id);
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
