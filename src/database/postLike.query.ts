import { executeQuery, prisma } from "../script";
import { PostLike } from "../types/types";

export function likePost(userId: string, postId: string) {
  return executeQuery<PostLike>(
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
  return await executeQuery<PostLike>(
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
