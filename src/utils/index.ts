import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { DataSourceContext } from "../types/context";
import { UserAPI } from "../dataSource/user.api";
import { ApolloServer, BaseContext } from "@apollo/server";
import { FriendRequestAPI } from "../dataSource/friendRequest.api";
import { PostAPI } from "../dataSource/post.api";

export const createContext: (
  args: ExpressContextFunctionArgument,
  server: ApolloServer<BaseContext>
) => Promise<DataSourceContext> = async ({ req }, server) => {
  const token = req.headers.authorization as string;
  const { cache } = server;
  return {
    dataSources: {
      userAPI: new UserAPI({ cache }, token),
      friendReqAPI: new FriendRequestAPI({ cache }, token),
      postAPI: new PostAPI({ cache }, token),
    },
  };
};
