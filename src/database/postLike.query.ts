import { executeQuery, prisma } from "../script";

export function likePost(userId: string, postId: string) {
  return executeQuery<{ id: string; postId: string }>(
    prisma.postLike.create({
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
    })
  );
}
export async function removeLike(postId: string, userId: string) {
  return await executeQuery<{ id: string }>(
    prisma.postLike.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    })
  );
}
