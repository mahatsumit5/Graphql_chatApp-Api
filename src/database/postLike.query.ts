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
  const result = await executeQuery<{ id: string }>(
    prisma.postLike.delete({
      where: {
        postId_userId: {
          postId: postId,
          userId: userId,
        },
      },
    })
  );
  console.log("like removed", result);
  return result;
}
removeLike(
  "1b1c0162-6e7e-4786-b571-d43165a1d166",
  "82ebde29-2a8f-4835-b468-971f751ffecf"
);
