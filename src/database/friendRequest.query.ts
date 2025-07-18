import { executeQuery, prisma } from "../script.js";
import { GetSentReqParams } from "../types/index.js";
import { FriendRequest } from "../types/types.js";
const SELECT_FRIEND_REQ = {
  to: {
    select: {
      id: true,
      fName: true,
      lName: true,
      email: true,
      profile: true,
      isActive: true,
    },
  },
  from: {
    select: {
      id: true,
      fName: true,
      lName: true,
      email: true,
      profile: true,
      isActive: true,
    },
  },
  status: true,
};
export function sendFriendRequest(from: string, to: string) {
  const result = executeQuery<FriendRequest>(
    prisma.friendRequests.create({
      data: {
        from: {
          connect: { id: from },
        },
        to: {
          connect: { id: to },
        },
      },
      select: SELECT_FRIEND_REQ,
    })
  );
  return result;
}

export function getFriendRequestByUser(id: string) {
  // Get friend requests sent by the user with this ID
  return executeQuery<[]>(
    prisma.friendRequests.findMany({
      where: {
        toId: id,
        status: "PENDING",
      },
      select: SELECT_FRIEND_REQ,
    })
  );
}
export function getYourSentRequest({
  id,
  page,
  search,
  take,
}: GetSentReqParams) {
  // Get friend requests sent by the user with this ID
  const result = executeQuery<[]>(
    prisma.friendRequests.findMany({
      where: {
        fromId: id,
        status: "PENDING",
        to: {
          email: {
            contains: search,
          },
        },
      },
      select: SELECT_FRIEND_REQ,
      skip: (page - 1) * 7,
      take: take,
    })
  );
  const count = executeQuery<number>(
    prisma.friendRequests.count({
      where: {
        fromId: id,
        status: "PENDING",
        to: {
          email: {
            contains: search,
          },
        },
      },
    })
  );
  return { result, count };
}

export function deleteSentRequest({
  fromId,
  toId,
}: {
  fromId: string;
  toId: string;
}) {
  return executeQuery<FriendRequest>(
    prisma.friendRequests.delete({
      where: {
        fromId_toId: {
          fromId: fromId,
          toId: toId,
        },
      },
      select: SELECT_FRIEND_REQ,
    })
  );
}

export function getNumberOfFriendReq(email: string) {
  return executeQuery(
    prisma.friendRequests.count({
      where: {
        to: {
          email,
        },
      },
    })
  );
}
