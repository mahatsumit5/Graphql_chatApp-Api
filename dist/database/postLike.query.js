import { executeQuery, prisma } from "../script.js";
export function likePost(userId, postId) {
    return executeQuery(prisma.postLike.create({
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
export async function removeLike(postId, userId) {
    return await executeQuery(prisma.postLike.delete({
        where: {
            postId_userId: {
                postId: postId,
                userId: userId,
            },
        },
    }));
}
