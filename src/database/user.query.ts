import { executeQuery, prisma } from "../script";
import { IUser } from "../types";
import { AllUser, Friend, SignUpUserParams, User } from "../types/types";

export function createUser(obj: SignUpUserParams) {
  return executeQuery(
    prisma.user.create({
      data: obj,
    })
  );
}
export function updateUser(userId: string, data: unknown) {
  return executeQuery(
    prisma.user.update({
      where: {
        id: userId,
      },
      data,
    })
  );
}
export function changePassword({
  email,
  newPassword,
}: {
  email: string;
  newPassword: string;
}) {
  return executeQuery(
    prisma.user.update({
      where: {
        email: email,
      },
      data: {
        password: newPassword,
      },
    })
  );
}
export function uploadProfileImage(email: string, path: string) {
  return executeQuery(
    prisma.user.update({
      where: {
        email: email,
      },
      data: {
        profile: path,
      },
    })
  );
}
export function getUserByEmailAndUpdate(email: string, dataToUpdate: any) {
  return executeQuery(
    prisma.user.update({
      where: {
        email: email,
      },
      data: dataToUpdate,
    })
  );
}

export function getUserByEmail(email: string) {
  return executeQuery< {password:string} extends User>(
    prisma.user.findUnique({
      where: { email: email },
    })
  );
}

export function getUserById(id: string) {
  return executeQuery(
    prisma.user.findUnique({
      where: { id: id },
      select: {
        id: true,
      },
    })
  );
}

type args = AllUser & {
  email: string;
};
export async function getAllUsers({ order, page, take, search, email }: args) {
  const skipAmount = (page - 1) * take;
  const { data } = await executeQuery<User[]>(
    prisma.user.findMany({
      where: {
        NOT: {
          OR: [
            {
              chatRoomCreated: {
                some: {
                  createdBy: {
                    email,
                  },
                },
              },
            },
            {
              friendRequests: {
                some: { from: { email } },
              },
            },
            {
              joinedChatRoom: {
                some: {
                  joinedBy: {
                    email,
                  },
                },
              },
            },
          ],
        },
        email: {
          contains: search.toLowerCase(),
        },
      },
      select: {
        fName: true,
        lName: true,
        email: true,
        profile: true,
        id: true,
        isActive: true,
      },
      take: take,
      orderBy: { fName: order },
      skip: skipAmount,
    })
  );
  const totalUsers = await executeQuery(
    prisma.user.count({
      where: {
        NOT: {
          chatRoomCreated: {
            some: {
              createdBy: {
                email,
              },
            },
          },
        },
        email: {
          contains: search || "",
        },
      },
    })
  );

  return { users: data, totalUsers };
}

export function deleteUser(id: string) {
  return executeQuery(
    prisma.user.delete({
      where: {
        id: id,
      },
    })
  );
}

export function deleteUserByEmail(email: string) {
  const data = executeQuery(
    prisma.user.delete({
      where: {
        email: email,
      },
    })
  );
  return data;
}

export async function getListOfFriends(userId: string): Promise<Friend[]> {
  const { data } = await executeQuery<[]>(
    prisma.chatRoom.findMany({
      where: {
        OR: [
          {
            createdById: userId,
          },
          {
            joinedById: userId,
          },
        ],
      },

      select: {
        createdBy: {
          omit: {
            password: true,
          },
        },
        joinedBy: { omit: { password: true } },
      },
    })
  );
  const friends: Friend[] = data.map(
    (user: { createdBy: User; joinedBy: User }) =>
      user.createdBy.id === userId ? user.joinedBy : user.createdBy
  );
  return friends;
}
