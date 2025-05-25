"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendFriendRequest = sendFriendRequest;
exports.getFriendRequestByUser = getFriendRequestByUser;
exports.getYourSentRequest = getYourSentRequest;
exports.deleteSentRequest = deleteSentRequest;
exports.getNumberOfFriendReq = getNumberOfFriendReq;
const script_1 = require("../script");
const SELECT_FRIEND_REQ = {
    to: {
        select: {
            id: true,
            fName: true,
            lName: true,
            email: true,
            profile: true,
            isActive: true,
        },
    },
    from: {
        select: {
            id: true,
            fName: true,
            lName: true,
            email: true,
            profile: true,
            isActive: true,
        },
    },
    status: true,
};
function sendFriendRequest(from, to) {
    const result = (0, script_1.executeQuery)(script_1.prisma.friendRequests.create({
        data: {
            from: {
                connect: { id: from },
            },
            to: {
                connect: { id: to },
            },
        },
        select: SELECT_FRIEND_REQ,
    }));
    return result;
}
function getFriendRequestByUser(id) {
    return (0, script_1.executeQuery)(script_1.prisma.friendRequests.findMany({
        where: {
            toId: id,
            status: "PENDING",
        },
        select: SELECT_FRIEND_REQ,
    }));
}
function getYourSentRequest({ id, page, search, take, }) {
    const result = (0, script_1.executeQuery)(script_1.prisma.friendRequests.findMany({
        where: {
            fromId: id,
            status: "PENDING",
            to: {
                email: {
                    contains: search,
                },
            },
        },
        select: SELECT_FRIEND_REQ,
        skip: (page - 1) * 7,
        take: take,
    }));
    const count = (0, script_1.executeQuery)(script_1.prisma.friendRequests.count({
        where: {
            fromId: id,
            status: "PENDING",
            to: {
                email: {
                    contains: search,
                },
            },
        },
    }));
    return { result, count };
}
function deleteSentRequest({ fromId, toId, }) {
    return (0, script_1.executeQuery)(script_1.prisma.friendRequests.delete({
        where: {
            fromId_toId: {
                fromId: fromId,
                toId: toId,
            },
        },
        select: SELECT_FRIEND_REQ,
    }));
}
function getNumberOfFriendReq(email) {
    return (0, script_1.executeQuery)(script_1.prisma.friendRequests.count({
        where: {
            to: {
                email,
            },
        },
    }));
}
