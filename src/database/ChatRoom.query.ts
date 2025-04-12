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
                user: {
                  email: {
                    contains: search.toLowerCase(),
                    mode: "insensitive",
                  },
                },
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
              id: userId,
            },
          },
        },
        messages: {
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

export async function getChatRoomByRoomId(id: string) {
  const data = await executeQuery(
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
  console.log(data.members);
}
// getChatRoomByRoomId("461f2ac6-98e7-4b56-81d8-5df20244063f");

export async function getChatRoomByUserId(loggedInUserId: string) {
  const data = await executeQuery(
    prisma.chatRoomUser.findMany({
      where: {
        user: {
          id: loggedInUserId,
        },
      },
    })
  );
  const res = data.map(({ chatRoomId }: { chatRoomId: string }) =>
    getOtherUserInChatRoom(chatRoomId, loggedInUserId).then((res) => {
      console.log(res);
    })
  );

  // ✅ Only other user(s), not the logged-in user

  return res;
}
export async function getOtherUserInChatRoom(
  chatRoomId: string,
  loggedInUserId: string
) {
  const users = await prisma.user.findFirst({
    where: {
      chatRoom: {
        some: {
          chatRoomId,
        },
      },
      id: {
        not: loggedInUserId,
      },
    },
    omit: {
      password: true,
    },
  });
  return users;
}
getChatRoomByUserId("286fa9a7-0d4e-46fa-9d9a-4f861d3d1834");
