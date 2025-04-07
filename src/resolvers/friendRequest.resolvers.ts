import { getFriendRequestByUser } from "../database/friendRequest.query";
import { Resolvers } from "../types/types";

export const friendRequestResolvers: Resolvers = {
  Query: {
    getFriendRequest: (_, args, { dataSources }) => {
      return dataSources.friendReqAPI.getFriendRequest(dataSources.user.id);
    },
    getSentFriendRequest(_, { queryParams }, { dataSources }) {
      return dataSources.friendReqAPI.getSentFriendRequest(queryParams!);
    },
  },
  Mutation: {
    sendRequest(_, { toId }, { dataSources }) {
      const fromId = dataSources.user.id;
      return dataSources.friendReqAPI.sendRequest({ fromId, toId });
    },
    deleteFriendRequest(_, { params }, { dataSources }) {
      return dataSources.friendReqAPI.deleteFriendRequest(params!);
    },

    acceptFriendRequest(_, { body }, { dataSources }) {
      return dataSources.friendReqAPI.acceptFriendRequest(body!);
    },
  },
};
