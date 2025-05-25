"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatePost = exports.deletePost = exports.getPostByUser = exports.getAllPost = exports.createPost = void 0;
exports.countTotalPost = countTotalPost;
const script_1 = require("../script");
const SELECT_USER_PROFILE = {
    email: true,
    fName: true,
    lName: true,
    id: true,
    profile: true,
    isActive: true,
};
const createPost = ({ id, ...rest }) => {
    return (0, script_1.executeQuery)(script_1.prisma.post.create({
        data: {
            ...rest,
            author: {
                connect: {
                    id,
                },
            },
        },
        select: {
            author: {
                select: SELECT_USER_PROFILE,
            },
            id: true,
            likes: {
                select: {
                    id: true,
                    userId: true,
                    postId: true,
                },
            },
            images: true,
            comments: {
                select: {
                    id: true,
                },
            },
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    comments: true,
                    likes: true,
                },
            },
        },
    }));
};
exports.createPost = createPost;
const getAllPost = async ({ page, take, userId, }) => {
    try {
        const skip = (page - 1) * take;
        const { data, error } = await (0, script_1.executeQuery)(script_1.prisma.post.findMany({
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                updatedAt: true,
                images: true,
                author: {
                    select: SELECT_USER_PROFILE,
                },
                _count: {
                    select: {
                        comments: true,
                        likes: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
            take: take,
            skip,
        }));
        if (error)
            throw new Error(error.message);
        const postIds = data?.map((post) => post.id);
        const userLikes = await script_1.prisma.postLike.findMany({
            where: {
                userId: userId,
                postId: {
                    in: postIds,
                },
            },
            select: {
                postId: true,
            },
        });
        const likedPostIds = new Set(userLikes.map((like) => like.postId));
        const postsWithHasLiked = data.map((post) => ({
            ...post,
            hasLiked: likedPostIds.has(post.id),
        }));
        return postsWithHasLiked;
    }
    catch (error) {
        return error;
    }
};
exports.getAllPost = getAllPost;
async function countTotalPost() {
    return (0, script_1.executeQuery)(script_1.prisma.post.count());
}
const getPostByUser = (authorId) => {
    return (0, script_1.executeQuery)(script_1.prisma.post.findMany({
        where: {
            authorId,
        },
        select: {
            author: {
                select: SELECT_USER_PROFILE,
            },
            id: true,
            likes: {
                select: {
                    id: true,
                    userId: true,
                    postId: true,
                },
            },
            images: true,
            comments: {
                select: {
                    id: true,
                },
            },
            title: true,
            content: true,
            createdAt: true,
            updatedAt: true,
            _count: {
                select: {
                    comments: true,
                },
            },
        },
        orderBy: {
            createdAt: "desc",
        },
    }));
};
exports.getPostByUser = getPostByUser;
const deletePost = (id, authorId) => {
    return (0, script_1.executeQuery)(script_1.prisma.post.delete({
        where: {
            id,
            authorId,
        },
    }));
};
exports.deletePost = deletePost;
const updatePost = ({ id, ...rest }) => {
    return (0, script_1.executeQuery)(script_1.prisma.post.update({
        where: {
            id,
        },
        data: { ...rest },
    }));
};
exports.updatePost = updatePost;
