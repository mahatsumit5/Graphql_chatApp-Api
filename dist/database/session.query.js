"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSession = createSession;
exports.findSessionAndDelete = findSessionAndDelete;
exports.getAllSession = getAllSession;
exports.getSession = getSession;
const script_1 = require("../script");
function createSession({ email, token, }) {
    return (0, script_1.executeQuery)(script_1.prisma.session.create({
        data: {
            token,
            associate: {
                connect: { email: email },
            },
        },
    }));
}
function findSessionAndDelete(token, email) {
    return (0, script_1.executeQuery)(script_1.prisma.session.delete({
        where: {
            userEmail_token: {
                userEmail: email,
                token,
            },
        },
    }));
}
function getAllSession() {
    return (0, script_1.executeQuery)(script_1.prisma.session.findMany());
}
async function getSession(token) {
    const result = await (0, script_1.executeQuery)(script_1.prisma.session.findFirst({
        where: {
            token,
        },
        select: {
            associate: {
                select: {
                    email: true,
                    fName: true,
                    lName: true,
                    bio: true,
                    id: true,
                    coverPicture: true,
                    profile: true,
                    isActive: true,
                },
            },
        },
    }));
    return result;
}
