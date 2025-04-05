import { Resolvers } from "../types/types";
import { pubsub } from ".";
import { authoriseUser } from "../middleware";

export const postResolvers: Resolvers = {
  Query: {
    getAllPosts: (parent, { args }, { dataSources }) => {
      authoriseUser(dataSources.isAuthenticated);
      console.log(args, "args");
      return dataSources.postAPI.getAllPost({
        ...args,
        userId: "61060a37-36ea-4519-a243-099616b93f07",
      });
    },
  },
  Mutation: {
    uploadPost: async (parent, { body }, { dataSources }) => {
      const response = await dataSources.postAPI.createAPost(body);
      pubsub.publish("POST_CREATED", { newPost: response.result });
      return response;
    },
  },
};
