import { Resolvers } from "../types/types";
import { pubsub } from ".";
import { updatePost } from "../database/post.query";

export const postResolvers: Resolvers = {
  Query: {
    getAllPosts: (_, { args }, { dataSources }) => {
      const userId = dataSources.user.id;
      return dataSources.postAPI.getAllPost({
        ...args,
        userId,
      });
    },
  },
  Mutation: {
    uploadPost: async (_, { body }, { dataSources }) => {
      const response = await dataSources.postAPI.createAPost(body);
      pubsub.publish("POST_CREATED", { newPost: response.result });
      return response;
    },
    updatePost: async (_, arg, { dataSources }) => {
      const updatedPost = await updatePost(arg);
      if (!updatedPost?.id) throw new Error("Unable to updata post");
      return {
        status: true,
        message: "Post Updated",
        result: updatedPost,
      };
    },
  },
};
