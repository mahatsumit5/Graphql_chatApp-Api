"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolver = void 0;
const post_query_1 = require("../database/post.query");
const __1 = require("..");
exports.postResolver = {
    Query: {
        getAllPosts: (_, { args }, { dataSources }) => {
            const userId = dataSources.user.id;
            return dataSources.postAPI.getAllPost({
                ...args,
                userId,
            });
        },
    },
    Mutation: {
        uploadPost: async (_, { body }, { dataSources }) => {
            const userid = dataSources.user.id;
            const response = await dataSources.postAPI.createAPost({
                ...body,
                id: userid,
            });
            __1.pubsub.publish("POST_CREATED", { newPost: response.result });
            return response;
        },
        updatePost: async (_, arg, { dataSources }) => {
            const { data, error } = await (0, post_query_1.updatePost)(arg);
            if (!data?.id)
                throw new Error("Unable to updata post");
            return {
                status: true,
                message: "Post Updated",
                result: data,
            };
        },
        likePost: async (_, arg, { dataSources, pubsub }) => {
            return dataSources.postAPI.likePost(arg.postId);
        },
        unlikePost: async (__, arg, { dataSources }) => {
            return dataSources.postAPI.unlikePost(arg.postId);
        },
    },
};
