import { executeQuery, prisma } from "../script.js";
import { CreateCommentParams, UpdateCommentParams } from "../types/index.js";
import { PostComment } from "../types/types.js";
export function postComment({ content, postId, userId }: CreateCommentParams) {
  return executeQuery<PostComment>(
    prisma.comment.create({
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
    })
  );
}

export function updateComment({
  commentId,
  content,
  uid,
}: UpdateCommentParams) {
  return executeQuery(
    prisma.comment.update({
      where: {
        id: commentId,
        authorId: uid,
      },
      data: {
        content,
      },
    })
  );
}
export function deleteComment(id: string) {
  return executeQuery<PostComment>(
    prisma.comment.delete({
      where: {
        id,
      },
    })
  );
}
export function likeComment(commentId: string, uid: string) {
  return executeQuery(
    prisma.commentLikes.create({
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
    })
  );
}

export function unlikeComment(commentId: string, userId: string) {
  return executeQuery(
    prisma.commentLikes.delete({
      where: {
        commentId_userId: {
          commentId,
          userId,
        },
      },
    })
  );
}

export function getCommentsByPostId(postId: string) {
  return executeQuery<PostComment[]>(
    prisma.comment.findMany({
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
    })
  );
}
