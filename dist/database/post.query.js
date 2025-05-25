import { executeQuery, prisma } from "../script.js";
const SELECT_USER_PROFILE = {
    email: true,
    fName: true,
    lName: true,
    id: true,
    profile: true,
    isActive: true,
};
export const createPost = ({ id, ...rest }) => {
    return executeQuery(prisma.post.create({
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
export const getAllPost = async ({ page, take, userId, }) => {
    try {
        const skip = (page - 1) * take;
        const { data, error } = await executeQuery(prisma.post.findMany({
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
        const userLikes = await prisma.postLike.findMany({
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
export async function countTotalPost() {
    return executeQuery(prisma.post.count());
}
export const getPostByUser = (authorId) => {
    return executeQuery(prisma.post.findMany({
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
export const deletePost = (id, authorId) => {
    return executeQuery(prisma.post.delete({
        where: {
            id,
            authorId,
        },
    }));
};
export const updatePost = ({ id, ...rest }) => {
    return executeQuery(prisma.post.update({
        where: {
            id,
        },
        data: { ...rest },
    }));
};
