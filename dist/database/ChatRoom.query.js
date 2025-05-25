import { executeQuery, prisma } from "../script.js";
export function createChatRoom(from, to) {
    const result = executeQuery(prisma.chatRoom.create({
        data: {
            createdBy: {
                connect: {
                    id: from,
                },
            },
            joinedBy: {
                connect: {
                    id: to,
                },
            },
        },
    }));
    return result;
}
export function deleteChatRoom(roomId) {
    executeQuery(prisma.message.deleteMany({
        where: {
            chatRoomId: roomId,
        },
    }));
    return executeQuery(prisma.chatRoom.delete({
        where: {
            id: roomId,
        },
    }));
}
export function deleteAllChatRoom() {
    return executeQuery(prisma.chatRoom.deleteMany({}));
}
export function getChatRoomByRoomId(id) {
    return executeQuery(prisma.chatRoom.findFirst({
        where: {
            id,
        },
        include: {
            joinedBy: {
                omit: {
                    password: true,
                },
            },
        },
    }));
}
export function getChatRoomByUserId({ userId, page, search, take, }) {
    const data = executeQuery(prisma.chatRoom.findMany({
        where: {
            AND: [
                {
                    OR: [
                        {
                            createdById: userId,
                        },
                        {
                            joinedById: userId,
                        },
                    ],
                },
                {
                    joinedBy: {
                        email: {
                            contains: search,
                            mode: "insensitive",
                        },
                    },
                },
            ],
        },
        select: {
            createdBy: {
                omit: {
                    password: true,
                },
            },
            joinedBy: {
                omit: {
                    password: true,
                },
            },
            messages: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 1,
            },
            id: true,
            unseenMessages: true,
            _count: {
                select: {
                    messages: {
                        where: {
                            isSeen: false,
                        },
                    },
                },
            },
        },
        take: take ? take : undefined,
        skip: page && take ? (page - 1) * take : undefined,
    }));
    return data;
}
