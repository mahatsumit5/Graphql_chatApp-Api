"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRoomResolver = void 0;
exports.chatRoomResolver = {
    Query: {
        getAllChatRooms: (_, args, { dataSources }) => {
            const userId = dataSources.user.id;
            return dataSources.chatRoom.getChatRoomByUserId({ ...args, userId });
        },
    },
};
