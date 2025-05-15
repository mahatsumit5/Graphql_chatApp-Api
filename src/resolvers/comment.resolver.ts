import { Resolvers } from "../types/types";

export const commentResolver: Resolvers = {
  Query: {
    getComments: async (__, { postId }, { dataSources }) => {
      return dataSources.commentApi.getCommentByPostId(postId);
    },
  },
  Mutation: {
    createComment: async (__, arg, { dataSources }) => {
      return dataSources.commentApi.postComment(arg);
    },
  },
};
