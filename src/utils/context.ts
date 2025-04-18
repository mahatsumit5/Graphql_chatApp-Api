import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { UserAPI } from "../dataSource/user.api";
import { ApolloServer, BaseContext } from "@apollo/server";
import { FriendRequestAPI } from "../dataSource/friendRequest.api";
import { PostAPI } from "../dataSource/post.api";
import { ChatRoomApi } from "../dataSource/chatRoom.api";
import { MessageApi } from "../dataSource/message.api";

export const createContext: (
  args: ExpressContextFunctionArgument,
  server: ApolloServer<BaseContext>
) => Promise<any> = async ({ req, res }, server) => {
  try {
    const user = req.userInfo;

    // get the request from the request
    const headerToken = req.headers.authorization || "";
    const token = headerToken.split(" ")[1];
    const { cache } = server;

    return {
      dataSources: {
        userAPI: new UserAPI({ cache }, token),
        friendReqAPI: new FriendRequestAPI({ cache }, token),
        postAPI: new PostAPI({ cache }, token),
        user: user,
        chatRoom: new ChatRoomApi({ cache }, token),
        message: new MessageApi({ cache }, token),
      },
    };
  } catch (error) {
    return {
      dataSources: {},
    };
  }
};
