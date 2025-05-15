import { Resolvers } from "../types/types";

export const chatRoomResolver: Resolvers = {
  Query: {
    getAllChatRooms: (_, args, { dataSources }) => {
      const userId = dataSources.user.id;
      return dataSources.chatRoom.getChatRoomByUserId({ ...args, userId });
    },
  },
};
