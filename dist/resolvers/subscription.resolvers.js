"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionsResolvers = void 0;
const graphql_subscriptions_1 = require("graphql-subscriptions");
const pubsub = new graphql_subscriptions_1.PubSub();
exports.subscriptionsResolvers = {
    Subscription: {
        postCreated: {
            subscribe: () => pubsub.asyncIterableIterator(["POST_CREATED"]),
        },
    },
};
