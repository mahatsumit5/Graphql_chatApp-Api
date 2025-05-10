import { executeQuery, prisma } from "../script";
import { Session } from "../types/types";
export function createSession({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  return executeQuery(
    prisma.session.create({
      data: {
        token,
        associate: {
          connect: { email: email },
        },
      },
    })
  );
}
export function findSessionAndDelete(token: string, email: string) {
  return executeQuery<Session>(
    prisma.session.delete({
      where: {
        userEmail_token: {
          userEmail: email,
          token,
        },
      },
    })
  );
}

export function getAllSession() {
  return executeQuery(prisma.session.findMany());
}

export async function getSession(token: string) {
  const result = await executeQuery<Session>(
    prisma.session.findFirst({
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
    })
  );
  return result;
}
