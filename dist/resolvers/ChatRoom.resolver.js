export const chatRoomResolver = {
    Query: {
        getAllChatRooms: (_, args, { dataSources }) => {
            const userId = dataSources.user.id;
            return dataSources.chatRoom.getChatRoomByUserId({ ...args, userId });
        },
    },
};
