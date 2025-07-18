import { Resolvers } from "../types/types.js";
import { updatePost } from "../database/post.query.js";
import { pubsub } from "../index.js";

export const postResolver: Resolvers = {
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
      const userid = dataSources.user.id;
      const response = await dataSources.postAPI.createAPost({
        ...body,
        id: userid,
      });
      pubsub.publish("POST_CREATED", { newPost: response.result });
      return response;
    },
    updatePost: async (_, arg, { dataSources }) => {
      const { data, error } = await updatePost(arg);
      if (!data?.id) throw new Error("Unable to updata post");
      return {
        status: true,
        message: "Post Updated",
        result: data,
      };
    },
    likePost: async (_, arg, { dataSources, pubsub }) => {
      return dataSources.postAPI.likePost(arg.postId);
    },
    unlikePost: async (__, arg, { dataSources }) => {
      return dataSources.postAPI.unlikePost(arg.postId);
    },
    deletePost: async (__, arg, { dataSources }) => {
      return dataSources.postAPI.deletePost(arg.id);
    },
  },
};
