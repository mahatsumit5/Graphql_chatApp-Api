import { executeQuery, prisma } from "../script";
import { SendMessageParams } from "../types";
import { MessageByRoomIdParams } from "../types/types";

export const sendMessage = ({ content, roomId, author }: SendMessageParams) => {
  const result = executeQuery(
    prisma.message.create({
      data: {
        content,
        author: {
          connect: {
            id: author,
          },
        },
        chat: {
          connect: {
            id: roomId,
          },
        },
      },
      include: {
        author: {
          omit: {
            password: true,
          },
        },
      },
    })
  );
  return result;
};

export const getMessageByRoomId = ({
  roomId: id,
  skip,
  take,
}: MessageByRoomIdParams) => {
  const result = executeQuery(
    prisma.chatRoom.findFirst({
      where: {
        id,
      },

      select: {
        messages: {
          include: {
            author: {
              omit: {
                password: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
          take,
          skip,
        },

        _count: {
          select: {
            messages: true,
          },
        },
      },
    })
  );
  return result;
};
export const getLastMessageByRoomId = (roomid: string) => {
  const result = executeQuery(
    prisma.chatRoom.findFirst({
      where: {
        id: roomid,
      },
      select: {
        messages: {
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    })
  );
  return result;
};

export const deleteMessage = (messageId: string) => {
  const result = executeQuery(
    prisma.message.deleteMany({ where: { id: messageId } })
  );
  return result;
};
export const deleteAllMessage = () => {
  return executeQuery(prisma.message.deleteMany());
};

export const updateMessage = (messageId: string, content: string) => {
  const result = executeQuery(
    prisma.message.update({
      where: { id: messageId },
      data: {
        content: content,
      },
    })
  );
  console.log(result);

  return result;
};
