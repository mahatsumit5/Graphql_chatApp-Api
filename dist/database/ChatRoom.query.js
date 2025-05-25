"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatRoom = createChatRoom;
exports.deleteChatRoom = deleteChatRoom;
exports.deleteAllChatRoom = deleteAllChatRoom;
exports.getChatRoomByRoomId = getChatRoomByRoomId;
exports.getChatRoomByUserId = getChatRoomByUserId;
const script_1 = require("../script");
function createChatRoom(from, to) {
    const result = (0, script_1.executeQuery)(script_1.prisma.chatRoom.create({
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
function deleteChatRoom(roomId) {
    (0, script_1.executeQuery)(script_1.prisma.message.deleteMany({
        where: {
            chatRoomId: roomId,
        },
    }));
    return (0, script_1.executeQuery)(script_1.prisma.chatRoom.delete({
        where: {
            id: roomId,
        },
    }));
}
function deleteAllChatRoom() {
    return (0, script_1.executeQuery)(script_1.prisma.chatRoom.deleteMany({}));
}
function getChatRoomByRoomId(id) {
    return (0, script_1.executeQuery)(script_1.prisma.chatRoom.findFirst({
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
function getChatRoomByUserId({ userId, page, search, take, }) {
    const data = (0, script_1.executeQuery)(script_1.prisma.chatRoom.findMany({
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
