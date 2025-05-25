"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postComment = postComment;
exports.updateComment = updateComment;
exports.deleteComment = deleteComment;
exports.likeComment = likeComment;
exports.unlikeComment = unlikeComment;
exports.getCommentsByPostId = getCommentsByPostId;
const script_1 = require("../script");
function postComment({ content, postId, userId }) {
    return (0, script_1.executeQuery)(script_1.prisma.comment.create({
        data: {
            content,
            author: {
                connect: {
                    id: userId,
                },
            },
            post: {
                connect: {
                    id: postId,
                },
            },
            replies: {},
        },
        include: {
            likes: true,
            author: {
                select: {
                    id: true,
                    bio: true,
                    coverPicture: true,
                    email: true,
                    fName: true,
                    lName: true,
                    profile: true,
                    isActive: true,
                },
            },
            replies: true,
        },
    }));
}
function updateComment({ commentId, content, uid, }) {
    return (0, script_1.executeQuery)(script_1.prisma.comment.update({
        where: {
            id: commentId,
            authorId: uid,
        },
        data: {
            content,
        },
    }));
}
function deleteComment(id) {
    return (0, script_1.executeQuery)(script_1.prisma.comment.delete({
        where: {
            id,
        },
    }));
}
function likeComment(commentId, uid) {
    return (0, script_1.executeQuery)(script_1.prisma.commentLikes.create({
        data: {
            comment: {
                connect: {
                    id: commentId,
                },
            },
            user: {
                connect: {
                    id: uid,
                },
            },
        },
        select: {
            userId: true,
        },
    }));
}
function unlikeComment(commentId, userId) {
    return (0, script_1.executeQuery)(script_1.prisma.commentLikes.delete({
        where: {
            commentId_userId: {
                commentId,
                userId,
            },
        },
    }));
}
function getCommentsByPostId(postId) {
    return (0, script_1.executeQuery)(script_1.prisma.comment.findMany({
        where: {
            postId,
        },
        include: {
            author: {
                select: {
                    id: true,
                    email: true,
                    fName: true,
                    bio: true,
                    coverPicture: true,
                    lName: true,
                    profile: true,
                    isActive: true,
                },
            },
            likes: {
                select: {
                    userId: true,
                },
            },
            replies: true,
        },
    }));
}
