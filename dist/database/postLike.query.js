"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = likePost;
exports.removeLike = removeLike;
const script_1 = require("../script");
function likePost(userId, postId) {
    return (0, script_1.executeQuery)(script_1.prisma.postLike.create({
        data: {
            post: {
                connect: {
                    id: postId,
                },
            },
            user: {
                connect: {
                    id: userId,
                },
            },
        },
    }));
}
async function removeLike(postId, userId) {
    return await (0, script_1.executeQuery)(script_1.prisma.postLike.delete({
        where: {
            postId_userId: {
                postId: postId,
                userId: userId,
            },
        },
    }));
}
