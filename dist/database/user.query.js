"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.changePassword = changePassword;
exports.uploadProfileImage = uploadProfileImage;
exports.getUserByEmailAndUpdate = getUserByEmailAndUpdate;
exports.getUserByEmail = getUserByEmail;
exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.deleteUser = deleteUser;
exports.deleteUserByEmail = deleteUserByEmail;
exports.getListOfFriends = getListOfFriends;
const script_1 = require("../script");
function createUser(obj) {
    return (0, script_1.executeQuery)(script_1.prisma.user.create({
        data: obj,
    }));
}
function updateUser(userId, data) {
    return (0, script_1.executeQuery)(script_1.prisma.user.update({
        where: {
            id: userId,
        },
        data,
    }));
}
function changePassword({ email, newPassword, }) {
    return (0, script_1.executeQuery)(script_1.prisma.user.update({
        where: {
            email: email,
        },
        data: {
            password: newPassword,
        },
    }));
}
function uploadProfileImage(email, path) {
    return (0, script_1.executeQuery)(script_1.prisma.user.update({
        where: {
            email: email,
        },
        data: {
            profile: path,
        },
    }));
}
function getUserByEmailAndUpdate(email, dataToUpdate) {
    return (0, script_1.executeQuery)(script_1.prisma.user.update({
        where: {
            email: email,
        },
        data: dataToUpdate,
    }));
}
function getUserByEmail(email) {
    return (0, script_1.executeQuery)(script_1.prisma.user.findUnique({
        where: { email: email },
    }));
}
function getUserById(id) {
    return (0, script_1.executeQuery)(script_1.prisma.user.findUnique({
        where: { id: id },
        select: {
            id: true,
        },
    }));
}
async function getAllUsers({ order, page, take, search, email }) {
    const skipAmount = (page - 1) * take;
    const { data } = await (0, script_1.executeQuery)(script_1.prisma.user.findMany({
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
    const { data: totalUsers } = await (0, script_1.executeQuery)(script_1.prisma.user.count({
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
function deleteUser(id) {
    return (0, script_1.executeQuery)(script_1.prisma.user.delete({
        where: {
            id: id,
        },
    }));
}
function deleteUserByEmail(email) {
    const data = (0, script_1.executeQuery)(script_1.prisma.user.delete({
        where: {
            email: email,
        },
    }));
    return data;
}
async function getListOfFriends(userId) {
    const { data } = await (0, script_1.executeQuery)(script_1.prisma.chatRoom.findMany({
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
