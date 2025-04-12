import { executeQuery, prisma } from "../script";
import { GetChatRoomParams } from "../types";

export function createChatRoom(from: string, to: string) {
  const result = executeQuery(
    prisma.chatRoom.create({
      data: {
        members: {
          connect: [
            {
              id: from,
            },
            { id: to },
          ],
        },
      },
    })
  );
  return result;
}

export function getChatRoom({ userId, page, search, take }: GetChatRoomParams) {
  const rooms = executeQuery(
    prisma.chatRoom.findMany({
      where: {
        AND: [
          {
            members: {
              some: {
                id: userId,
              },
            },
          },
          {
            members: {
              some: {
                email: {
                  contains: search,
                },
              },
            },
          },
        ],
      },
      include: {
        members: {
          select: {
            id: true,
            fName: true,
            lName: true,
            email: true,
            profile: true,
            isActive: true,
            bio: true,
            coverPicture: true,
          },
          where: {
            NOT: {
              id: userId,
            },
          },
        },
      },

      take: take ? take : undefined,
      skip: page && take ? (page - 1) * take : undefined,
    })
  );

  return rooms;
}

export function deleteChatRoom(roomId: string) {
  executeQuery(
    prisma.message.deleteMany({
      where: {
        chatRoomId: roomId,
      },
    })
  );
  return executeQuery(
    prisma.chatRoom.delete({
      where: {
        id: roomId,
      },
    })
  );
}

export function getChatRoomByEmail(email: string) {
  return executeQuery(
    prisma.chatRoom.findMany({
      where: {
        AND: [
          {
            members: {
              some: {
                email: email,
              },
            },
          },
        ],
      },
    })
  );
}

export async function getChatRoomByRoomId(id: string) {
  const data = await executeQuery(
    prisma.chatRoom.findFirst({
      where: {
        id,
      },
      include: {
        members: {
          select: {
            id: true,
            fName: true,
            lName: true,
            email: true,
            profile: true,
            isActive: true,
            bio: true,
            coverPicture: true,
          },
        },
      },
    })
  );
}
