import { pubsub } from "../index.js";
export const messageResolver = {
    Mutation: {
        sendMessage: async (_, args, { dataSources }) => {
            const response = await dataSources.message.sendMessage(args);
            if (response?.status) {
                pubsub.publish(`MESSAGE_CREATED_${args.roomId}`, {
                    messageInRoom: response.data,
                });
                pubsub.publish(`SEND_MESSAGE_TO_${args.receiverId}`, {
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
