import { executeQuery, prisma } from "../script.js";
import { CreatePostParams, UpdataPostParams } from "../types/index.js";
import { Post, PostInput } from "../types/types.js";
const SELECT_USER_PROFILE = {
  email: true,
  fName: true,
  lName: true,
  id: true,
  profile: true,
  isActive: true,
};

export const createPost = ({ id, ...rest }: PostInput & { id: string }) => {
  return executeQuery<Post>(
    prisma.post.create({
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
    })
  );
};

export const getAllPost = async ({
  page,
  take,
  userId,
}: {
  page: number;
  take: number;
  userId: string;
}) => {
  try {
    const skip = (page - 1) * take;
    const { data, error } = await executeQuery<Post[]>(
      prisma.post.findMany({
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
      })
    );
    if (error) throw new Error(error.message);
    // Check if the logged-in user has liked each post
    const postIds = data?.map((post: { id: string }) => post.id); // Extracting the post ids
    // Query the PostLike table to see if the user has liked any posts
    const userLikes = await prisma.postLike.findMany({
      where: {
        userId: userId,
        postId: {
          in: postIds, // Filter by the posts that were fetched
        },
      },
      select: {
        postId: true,
      },
    });

    // Convert userLikes to a set of postIds for easier lookup
    const likedPostIds = new Set(
      userLikes.map((like: { postId: string }) => like.postId)
    );

    // Add hasLiked field to the posts
    const postsWithHasLiked: Post[] = data.map((post: Post) => ({
      ...post,
      hasLiked: likedPostIds.has(post.id), // Check if the post is in the likedPostIds set
    }));
    return postsWithHasLiked;
  } catch (error) {
    return error;
  }
};
export async function countTotalPost() {
  return executeQuery<number>(prisma.post.count());
}

export const getPostByUser = (authorId: string) => {
  return executeQuery<Post[]>(
    prisma.post.findMany({
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
    })
  );
};

export const deletePost = (id: string, authorId: string) => {
  return executeQuery<Post>(
    prisma.post.delete({
      where: {
        id,
        authorId,
      },
    })
  );
};

export const updatePost = ({ id, ...rest }: UpdataPostParams) => {
  return executeQuery<Post>(
    prisma.post.update({
      where: {
        id,
      },
      data: { ...rest },
    })
  );
};
