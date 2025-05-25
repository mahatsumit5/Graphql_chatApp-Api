"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const merge_1 = require("@graphql-tools/merge");
const user_resolver_1 = require("./user.resolver");
const post_resolver_1 = require("./post.resolver");
const friendRequest_resolver_1 = require("./friendRequest.resolver");
const subscription_resolver_1 = require("./subscription.resolver");
const ChatRoom_resolver_1 = require("./ChatRoom.resolver");
const message_resolver_1 = require("./message.resolver");
const comment_resolver_1 = require("./comment.resolver");
exports.resolvers = (0, merge_1.mergeResolvers)([
    user_resolver_1.userResolver,
    post_resolver_1.postResolver,
    friendRequest_resolver_1.friendRequestResolver,
    subscription_resolver_1.subscriptionResolver,
    ChatRoom_resolver_1.chatRoomResolver,
    message_resolver_1.messageResolver,
    comment_resolver_1.commentResolver,
]);
