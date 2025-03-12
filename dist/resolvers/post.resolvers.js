"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postResolvers = void 0;
exports.postResolvers = {
    Query: {
        getPosts: (parent, args, { dataSources }) => {
            return dataSources.postAPI.getAllPost();
        },
    },
};
