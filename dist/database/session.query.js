import { executeQuery, prisma } from "../script.js";
export function createSession({ email, token, }) {
    return executeQuery(prisma.session.create({
        data: {
            token,
            associate: {
                connect: { email: email },
            },
        },
    }));
}
export function findSessionAndDelete(token, email) {
    return executeQuery(prisma.session.delete({
        where: {
            userEmail_token: {
                userEmail: email,
                token,
            },
        },
    }));
}
export function getAllSession() {
    return executeQuery(prisma.session.findMany());
}
export async function getSession(token) {
    const result = await executeQuery(prisma.session.findFirst({
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
