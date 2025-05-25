export const commentResolver = {
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
