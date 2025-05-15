import { getFriendRequestByUser } from "../database/friendRequest.query";
import { Resolvers } from "../types/types";

export const friendRequestResolver: Resolvers = {
  Query: {
    getFriendRequest: (_, args, { dataSources }) => {
      return dataSources.friendReqAPI.getFriendRequest(dataSources.user.id);
    },
    getSentFriendRequest(_, arg, { dataSources }) {
      const userId = dataSources.user.id;
      return dataSources.friendReqAPI.getSentFriendRequest({
        id: userId,
        ...arg,
      });
    },
  },
  Mutation: {
    sendRequest(_, { toId }, { dataSources }) {
      const fromId = dataSources.user.id;
      return dataSources.friendReqAPI.sendRequest({ fromId, toId });
    },
    deleteFriendRequest(_, arg, { dataSources }) {
      return dataSources.friendReqAPI.deleteFriendRequest(arg);
    },

    acceptFriendRequest(_, arg, { dataSources }) {
      return dataSources.friendReqAPI.acceptFriendRequest(arg);
    },
  },
};
