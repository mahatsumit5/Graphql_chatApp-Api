"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateMessage = exports.deleteAllMessage = exports.deleteMessage = exports.getLastMessageByRoomId = exports.getMessageByRoomId = exports.sendMessage = void 0;
const script_1 = require("../script");
const sendMessage = ({ content, roomId, author }) => {
    const result = (0, script_1.executeQuery)(script_1.prisma.message.create({
        data: {
            content,
            author: {
                connect: {
                    id: author,
                },
            },
            chat: {
                connect: {
                    id: roomId,
                },
            },
        },
        include: {
            author: {
                omit: {
                    password: true,
                },
            },
        },
    }));
    return result;
};
exports.sendMessage = sendMessage;
const getMessageByRoomId = async ({ roomId: id, skip, take, }) => {
    const result = await (0, script_1.executeQuery)(script_1.prisma.chatRoom.findFirst({
        where: {
            id,
        },
        select: {
            messages: {
                include: {
                    author: {
                        omit: {
                            password: true,
                        },
                    },
                },
                orderBy: {
                    createdAt: "desc",
                },
                take,
                skip,
            },
            _count: {
                select: {
                    messages: true,
                },
            },
        },
    }));
    console.log(result.data, "result");
    return result;
};
exports.getMessageByRoomId = getMessageByRoomId;
const getLastMessageByRoomId = (roomid) => {
    const result = (0, script_1.executeQuery)(script_1.prisma.chatRoom.findFirst({
        where: {
            id: roomid,
        },
        select: {
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
            },
        },
    }));
    return result;
};
exports.getLastMessageByRoomId = getLastMessageByRoomId;
const deleteMessage = (messageId) => {
    const result = (0, script_1.executeQuery)(script_1.prisma.message.deleteMany({ where: { id: messageId } }));
    return result;
};
exports.deleteMessage = deleteMessage;
const deleteAllMessage = () => {
    return (0, script_1.executeQuery)(script_1.prisma.message.deleteMany());
};
exports.deleteAllMessage = deleteAllMessage;
const updateMessage = (messageId, content) => {
    const result = (0, script_1.executeQuery)(script_1.prisma.message.update({
        where: { id: messageId },
        data: {
            content: content,
        },
    }));
    return result;
};
exports.updateMessage = updateMessage;
