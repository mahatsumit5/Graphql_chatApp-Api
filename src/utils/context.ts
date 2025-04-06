import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { UserAPI } from "../dataSource/user.api";
import { ApolloServer, BaseContext } from "@apollo/server";
import { FriendRequestAPI } from "../dataSource/friendRequest.api";
import { PostAPI } from "../dataSource/post.api";
import { GraphQLError } from "graphql";

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
      },
    };
  } catch (error) {
    return {
      dataSources: {},
    };
  }
};
