"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = exports.pubsub = void 0;
const merge_1 = require("@graphql-tools/merge");
const user_resolvers_1 = require("./user.resolvers");
const post_resolvers_1 = require("./post.resolvers");
const friendRequest_resolvers_1 = require("./friendRequest.resolvers");
const subscription_resolvers_1 = require("./subscription.resolvers");
const graphql_subscriptions_1 = require("graphql-subscriptions");
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.resolvers = (0, merge_1.mergeResolvers)([
    user_resolvers_1.userResolvers,
    post_resolvers_1.postResolvers,
    friendRequest_resolvers_1.friendRequestResolvers,
    subscription_resolvers_1.subscriptionResolvers,
]);
