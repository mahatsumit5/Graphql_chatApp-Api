import { PubSub } from "graphql-subscriptions";
import { BaseAPI } from ".";
import {
  GetAllPostResponse,
  PostInput,
  UploadAPostResponse,
} from "../types/types";
import { createPost, getAllPost } from "../database/post.query";
import { CreatePostParams } from "../types";
import { getOrSetCache } from "../redis";
export class PostAPI extends BaseAPI {
  override baseURL = `${process.env.BASE_URL}/post/`;

  /**
   * Creates a new post.
   * @async
   * @returns {Promise<any>}
   */
  async createAPost(
    arg: PostInput & { id: string }
  ): Promise<UploadAPostResponse> {
    try {
      const response = await createPost(arg);
      if (!response.id) throw new Error("Unable to create a post");
      return {
        status: true,
        message: "sucessfull",
        result: response,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Retrieves all posts.
   * @async
   * @returns {Promise<GetAllPostResponse>}
   */
  async getAllPost(arg: {
    page: number;
    take: number;
    userId: string;
  }): Promise<GetAllPostResponse> {
    // TO DO: implement logic to fetch all posts

    try {
      const response = await getOrSetCache(
        `post-${arg.page}-${arg.userId}-${arg.take}`,
        5 * 60, //5 minutes
        async () => await getAllPost(arg)
      );
      if (!response) throw new Error("No posts found");
      return {
        posts: response.postsWithHasLiked,
        message: "Posts retrieved successfully",
        status: true,
        totalNumberOfPosts: response.count,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Retrieves a post by user.
   * @param {string} userId - The ID of the user.
   * @returns {Promise<any>}
   */
  async getPostByUser(userId: string) {
    // TO DO: implement logic to fetch post by user
  }

  /**
   * Deletes a post.
   * @param {string} postId - The ID of the post.
   * @returns {Promise<any>}
   */
  async deletePost(postId: string) {
    // TO DO: implement logic to delete post
  }

  /**
   * Updates a post.
   * @param {string} postId - The ID of the post.
   * @param {object} postUpdates - The updates to apply to the post.
   * @returns {Promise<any>}
   */
  async updatePost(postId: string, postUpdates: object) {
    // TO DO: implement logic to update post
  }

  /**
   * Likes a post.
   * @param {string} postId - The ID of the post.
   * @returns {Promise<any>}
   */
  async likePost(postId: string) {
    // TO DO: implement logic to like post
  }

  /**
   * Unlikes a post.
   * @param {string} postId - The ID of the post.
   * @returns {Promise<any>}
   */
  async unlikePost(postId: string) {
    // TO DO: implement logic to unlike post
  }
}
