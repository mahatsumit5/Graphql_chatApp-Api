import { executeQuery, prisma } from "../script";
import { ChatRoomResponse, GetChatRoomParams } from "../types";
import { ChatRoom } from "../types/types";

export function createChatRoom(from: string, to: string) {
  const result = executeQuery<{ id: string }>(
    prisma.chatRoom.create({
      data: {
        createdBy: {
          connect: {
            id: from,
          },
        },
        joinedBy: {
          connect: {
            id: to,
          },
        },
      },
    })
  );
  return result;
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

export function getChatRoomByRoomId(id: string) {
  return executeQuery(
    prisma.chatRoom.findFirst({
      where: {
        id,
      },
      include: {
        joinedBy: {
          omit: {
            password: true,
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
  const data = executeQuery<ChatRoomResponse[]>(
    prisma.chatRoom.findMany({
      where: {
        AND: [
          {
            OR: [
              {
                createdById: userId,
              },
              {
                joinedById: userId,
              },
            ],
          },
          {
            joinedBy: {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      select: {
        createdBy: {
          omit: {
            password: true,
          },
        },
        joinedBy: {
          omit: {
            password: true,
          },
        },
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
        id: true,
        unseenMessages: true,
        _count: {
          select: {
            messages: {
              where: {
                isSeen: false,
              },
            },
          },
        },
      },
      take: take ? take : undefined,
      skip: page && take ? (page - 1) * take : undefined,
    })
  );
  return data;
}
