"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageResolver = void 0;
const __1 = require("..");
exports.messageResolver = {
    Mutation: {
        sendMessage: async (_, args, { dataSources }) => {
            const response = await dataSources.message.sendMessage(args);
            if (response?.status) {
                __1.pubsub.publish(`MESSAGE_CREATED_${args.roomId}`, {
                    messageInRoom: response.data,
                });
                __1.pubsub.publish(`SEND_MESSAGE_TO_${args.receiverId}`, {
                    newMessageReceived: response.data,
                });
            }
            return response;
        },
    },
    Query: {
        getMessagesByRoomId: (_, { input }, { dataSources }) => {
            return dataSources.message.getMessages(input);
        },
    },
};
