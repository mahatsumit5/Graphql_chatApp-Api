import { executeQuery, prisma } from "../script.js";
export const sendMessage = ({ content, roomId, author }) => {
    const result = executeQuery(prisma.message.create({
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
export const getMessageByRoomId = async ({ roomId: id, skip, take, }) => {
    const result = await executeQuery(prisma.chatRoom.findFirst({
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
export const getLastMessageByRoomId = (roomid) => {
    const result = executeQuery(prisma.chatRoom.findFirst({
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
export const deleteMessage = (messageId) => {
    const result = executeQuery(prisma.message.deleteMany({ where: { id: messageId } }));
    return result;
};
export const deleteAllMessage = () => {
    return executeQuery(prisma.message.deleteMany());
};
export const updateMessage = (messageId, content) => {
    const result = executeQuery(prisma.message.update({
        where: { id: messageId },
        data: {
            content: content,
        },
    }));
    return result;
};
