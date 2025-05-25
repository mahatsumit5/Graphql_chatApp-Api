"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentResolver = void 0;
exports.commentResolver = {
    Query: {
        getComments: async (__, { postId }, { dataSources }) => {
            return dataSources.commentApi.getCommentByPostId(postId);
        },
    },
    Mutation: {
        createComment: async (__, arg, { dataSources }) => {
            return dataSources.commentApi.postComment(arg);
        },
        deleteComment: async (__, { id }, { dataSources }) => {
            return dataSources.commentApi.deleteComment(id);
        },
    },
};
