import { BaseAPI } from ".";
import {
  deleteComment,
  getCommentsByPostId,
  postComment,
} from "../database/comment.query";
import { CreateCommentParams } from "../types";
import {
  DeleteCommentResponse,
  GetCommentResponse,
  PostCommentResponse,
} from "../types/types";

export class CommentAPI extends BaseAPI {
  async postComment(arg: CreateCommentParams): Promise<PostCommentResponse> {
    try {
      const { data, error } = await postComment(arg);
      if (!data || error)
        throw new Error(error.message || "Unable to create a new comment");
      return {
        status: true,
        message: "Comments fetched successfully",
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }

  async getCommentByPostId(postId: string): Promise<GetCommentResponse> {
    try {
      const { data, error } = await getCommentsByPostId(postId);
      if (!data || error)
        throw new Error(error.message || "Unable to fetch comments");
      return {
        status: true,
        message: "Comments fetched successfully",
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
  async deleteComment(id: string): Promise<DeleteCommentResponse> {
    try {
      const { data, error } = await deleteComment(id);
      if (!data || error)
        throw new Error(error.message || "Unable to delete comment");
      return {
        status: true,
        message: "Comment deleted successfully",
        data,
      };
    } catch (error) {
      return this.handleError(error);
    }
  }
}
