import { BaseAPI } from ".";
import {
  GetAllPostResponse,
  GetLikedPostResponse,
  Post,
  PostInput,
  UnlikePostResponse,
  UploadAPostResponse,
} from "../types/types";
import { countTotalPost, createPost, getAllPost } from "../database/post.query";
import { getOrSetCache } from "../redis";
import { likePost, removeLike } from "../database/postLike.query";
export class PostAPI extends BaseAPI {
  /**
   * Creates a new post.
   * @async
   * @returns {Promise<any>}
   */
  async createAPost(
    arg: PostInput & { id: string }
  ): Promise<UploadAPostResponse> {
    try {
      const { data, error } = await createPost(arg);
      if (!data.id) throw new Error("Unable to create a post");
      return {
        status: true,
        message: "sucessfull",
        result: data,
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
    const key = `post-${arg.page}-${arg.userId}-${arg.take}`;
    const expiry = 1; //5 minutes

    try {
      const posts = await getOrSetCache<Post[]>(
        key,
        expiry,
        async () => await getAllPost(arg)
      );
      const { data: count, error } = await countTotalPost();
      if (error) throw new Error(error.message);
      if (!count) throw new Error("No posts found");
      return {
        posts: posts,
        message: "Posts retrieved successfully",
        status: true,
        totalNumberOfPosts: count,
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
  async likePost(postId: string): Promise<GetLikedPostResponse> {
    try {
      const { id } = this.getUser();
      const { data, error } = await likePost(id, postId);
      if (error) throw new Error(error.message);
      return {
        status: true,
        message: "You liked this post",
        likedPost: data.postId,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async unlikePost(postId: string): Promise<UnlikePostResponse> {
    try {
      const user = this.getUser();
      const { data, error } = await removeLike(postId, user.id);
      console.log(data);
      if (error) throw new Error(error.message);
      return {
        status: true,
        message: "like removed",
        data: data.postId,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
