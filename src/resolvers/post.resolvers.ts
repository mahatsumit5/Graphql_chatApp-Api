import { PubSub } from "graphql-subscriptions";
import { Resolvers } from "../types/types";
import { pubsub } from ".";

export const postResolvers: Resolvers = {
  Query: {
    getAllPosts: (parent, args, { dataSources }) => {
      return dataSources.postAPI.getAllPost();
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
