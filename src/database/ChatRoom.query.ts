import { executeQuery, prisma } from "../script";
import { GetChatRoomParams } from "../types";

async function test() {
  const room = await executeQuery(
    prisma.chatRoom.create({
      data: {},
    })
  );
  const res = await executeQuery(
    prisma.chatRoomUser.createMany({
      data: [
        {
          chatRoomId: room.id,
          userId: "286fa9a7-0d4e-46fa-9d9a-4f861d3d1834",
        },
        {
          chatRoomId: room.id,
          userId: "2b0f95c8-2309-4b23-914a-ea274e6b85a4",
        },
      ],
    })
  );

  console.log(res);
}
test();
export function createChatRoom(from: string, to: string) {
  const result = executeQuery(
    prisma.chatRoom.create({
      data: {
        members: {
          create: [
            {
              user: {
                connect: {
                  id: from,
                },
              },
            },
            {
              user: {
                connect: {
                  id: to,
                },
              },
            },
          ],
        },
      },
    })
  );
  return result;
}

export async function getChatRoom({
  userId,
  page,
  search,
  take,
}: GetChatRoomParams) {
  const rooms = await executeQuery(
    prisma.chatRoom.findMany({
      where: {
        AND: [
          {
            members: {
              some: {
                userId,
              },
            },
          },
        ],
      },
      include: {
        members: {
          select: {
            user: {
              omit: {
                password: true,
              },
            },
          },
          where: {
            NOT: {
              userId: userId,
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
export function deleteAllChatRoom() {
  return executeQuery(prisma.chatRoom.deleteMany({}));
}

export function getChatRoomByEmail(email: string) {
  return executeQuery(
    prisma.chatRoom.findMany({
      where: {
        members: {
          some: {
            user: {
              email,
            },
          },
        },
      },
    })
  );
}

export function getChatRoomByRoomId(id: string) {
  return executeQuery(
    prisma.chatRoom.findFirst({
      where: {
        id,
      },
      include: {
        members: {
          select: {
            user: {
              omit: {
                password: true,
              },
            },
          },
        },
      },
    })
  );
}

export function getChatRoomByUserId({
  userId,
  page,
  search,
  take,
}: GetChatRoomParams) {
  console.log(userId);
  const data = executeQuery(
    prisma.chatRoomUser.findMany({
      where: {
        userId,
      },
      select: {
        userId: false,
        chatRoomId: true,
        chatRoom: {
          include: {
            members: {
              select: {
                user: {
                  omit: {
                    password: true,
                  },
                },
              },
              where: {
                NOT: {},
              },
            },
          },
        },
      },
      // take: take ? take : undefined,
      // skip: page && take ? (page - 1) * take : undefined,
    })
  );
  return data;
}
