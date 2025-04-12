import { executeQuery, prisma } from "../script";
import { GetChatRoomParams } from "../types";

async function test() {
  const res = await executeQuery(
    prisma.chatRoomUser.create({
      data: {
        chatRoom: {
          connect: {
            id: "461f2ac6-98e7-4b56-81d8-5df20244063f",
          },
        },
        user: {
          connect: {
            id: "6e07ac43-bcfb-415a-9e86-50abe589fe43",
          },
        },
      },
    })
  );

  console.log(res);
}

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
          {
            // members: {
            //   some: {
            //     user: {
            //       email: {
            //         contains: search,
            //         mode: "insensitive",
            //       },
            //     },
            //   },
            // },
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
        messages: {
          select: {
            content: true,
            isSeen: true,
            author: true,
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },

      take: take ? take : undefined,
      skip: page && take ? (page - 1) * take : undefined,
    })
  );
  const count = await executeQuery(
    prisma.chatRoom.count({
      where: {
        AND: [
          {
            members: {
              some: {
                userId,
              },
            },
          },
          {
            messages: {
              every: {
                isSeen: false,
              },
            },
          },
        ],
      },
    })
  );
  console.log(count);
  return { rooms, count };
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
        id: false,
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
                NOT: {
                  id: userId,
                },
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
