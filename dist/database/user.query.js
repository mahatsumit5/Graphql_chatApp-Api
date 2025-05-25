import { executeQuery, prisma } from "../script.js";
export function createUser(obj) {
    return executeQuery(prisma.user.create({
        data: obj,
    }));
}
export function updateUser(userId, data) {
    return executeQuery(prisma.user.update({
        where: {
            id: userId,
        },
        data,
    }));
}
export function changePassword({ email, newPassword, }) {
    return executeQuery(prisma.user.update({
        where: {
            email: email,
        },
        data: {
            password: newPassword,
        },
    }));
}
export function uploadProfileImage(email, path) {
    return executeQuery(prisma.user.update({
        where: {
            email: email,
        },
        data: {
            profile: path,
        },
    }));
}
export function getUserByEmailAndUpdate(email, dataToUpdate) {
    return executeQuery(prisma.user.update({
        where: {
            email: email,
        },
        data: dataToUpdate,
    }));
}
export function getUserByEmail(email) {
    return executeQuery(prisma.user.findUnique({
        where: { email: email },
    }));
}
export function getUserById(id) {
    return executeQuery(prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
        },
    }));
}
export async function getAllUsers({ order, page, take, search, email }) {
    const skipAmount = (page - 1) * take;
    const { data } = await executeQuery(prisma.user.findMany({
        where: {
            NOT: {
                OR: [
                    {
                        chatRoomCreated: {
                            some: {
                                createdBy: {
                                    email,
                                },
                            },
                        },
                    },
                    {
                        friendRequests: {
                            some: { from: { email } },
                        },
                    },
                    {
                        joinedChatRoom: {
                            some: {
                                joinedBy: {
                                    email,
                                },
                            },
                        },
                    },
                ],
            },
            email: {
                contains: search.toLowerCase(),
            },
        },
        select: {
            fName: true,
            lName: true,
            email: true,
            profile: true,
            id: true,
            isActive: true,
        },
        take: take,
        orderBy: { fName: order },
        skip: skipAmount,
    }));
    const { data: totalUsers } = await executeQuery(prisma.user.count({
        where: {
            NOT: {
                chatRoomCreated: {
                    some: {
                        createdBy: {
                            email,
                        },
                    },
                },
            },
            email: {
                contains: search || "",
            },
        },
    }));
    return { users: data, totalUsers };
}
export function deleteUser(id) {
    return executeQuery(prisma.user.delete({
        where: {
            id: id,
        },
    }));
}
export function deleteUserByEmail(email) {
    const data = executeQuery(prisma.user.delete({
        where: {
            email: email,
        },
    }));
    return data;
}
export async function getListOfFriends(userId) {
    const { data } = await executeQuery(prisma.chatRoom.findMany({
        where: {
            OR: [
                {
                    createdById: userId,
                },
                {
                    joinedById: userId,
                },
            ],
        },
        select: {
            createdBy: {
                omit: {
                    password: true,
                },
            },
            joinedBy: { omit: { password: true } },
        },
    }));
    const friends = data.map((user) => user.createdBy.id === userId ? user.joinedBy : user.createdBy);
    return friends;
}
