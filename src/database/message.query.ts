import { executeQuery, prisma } from "../script";

export const sendMessage = ({
  content,
  roomId,
  author,
}: {
  content: string;
  author: string;
  roomId: string;
}) => {
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
    })
  );
  return result;
};

export const getMessageByUsers = (id: string, take: number, skip: number) => {
  const result = executeQuery(
    prisma.chatRoom.findFirst({
      where: {
        id: id,
      },
      include: {
        messages: {
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
