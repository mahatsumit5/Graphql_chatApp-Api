"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscriptionResolvers = void 0;
const _1 = require(".");
exports.subscriptionResolvers = {
    Subscription: {
        newPost: {
            subscribe: () => {
                return _1.pubsub.asyncIterableIterator(["POST_CREATED"]);
            },
        },
    },
};
