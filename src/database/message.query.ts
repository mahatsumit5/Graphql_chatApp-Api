import { executeQuery, prisma } from "../script.js";
import { SendMessageParams } from "../types/index.js";
import { Message, MessageByRoomIdParams } from "../types/types.js";

export const sendMessage = ({ content, roomId, author }: SendMessageParams) => {
  const result = executeQuery<Message>(
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

export const getMessageByRoomId = async ({
  roomId: id,
  skip,
  take,
}: MessageByRoomIdParams) => {
  const result = await executeQuery<{
    _count: { messages: number };
    messages: Message[];
  }>(
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
  console.log(result.data, "result");
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

  return result;
};
