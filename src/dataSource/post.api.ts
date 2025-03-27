import { PubSub } from "graphql-subscriptions";
import { BaseAPI } from ".";
import {
  GetAllPostsQuery,
  PostInput,
  UploadAPostResponse,
} from "../types/types";
export class PostAPI extends BaseAPI {
  override baseURL = `${process.env.BASE_URL}/post/`;

  /**
   * Creates a new post.
   * @async
   * @returns {Promise<any>}
   */
  async createAPost(body: PostInput): Promise<UploadAPostResponse> {
    try {
      const response = await this.post<UploadAPostResponse>("", {
        body,
      });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  /**
   * Retrieves all posts.
   * @async
   * @returns {Promise<any>}
   */
  async getAllPost(): Promise<GetAllPostsQuery> {
    // TO DO: implement logic to fetch all posts

    try {
      const response = await this.get<GetAllPostsQuery>("");

      return response;
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
