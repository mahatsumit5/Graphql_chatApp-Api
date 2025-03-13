"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolvers = void 0;
const _1 = require(".");
exports.postResolvers = {
    Query: {
        getAllPosts: (parent, args, { dataSources }) => {
            return dataSources.postAPI.getAllPost();
        },
    },
    Mutation: {
        uploadPost: async (parent, { body }, { dataSources }) => {
            const response = await dataSources.postAPI.createAPost(body);
            _1.pubsub.publish("POST_CREATED", { newPost: response.result });
            return response;
        },
    },
};
