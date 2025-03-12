"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const user_resolvers_1 = require("./user.resolvers");
const post_resolvers_1 = require("./post.resolvers");
const friendRequest_resolvers_1 = require("./friendRequest.resolvers");
exports.resolvers = (0, merge_1.mergeResolvers)([
    user_resolvers_1.userResolvers,
    post_resolvers_1.postResolvers,
    friendRequest_resolvers_1.friendRequestResolvers,
]);
