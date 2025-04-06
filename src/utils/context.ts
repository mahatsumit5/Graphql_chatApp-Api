import { ExpressContextFunctionArgument } from "@apollo/server/dist/esm/express4";
import { DataSourceContext } from "../types/context";
import { UserAPI } from "../dataSource/user.api";
import { ApolloServer, BaseContext } from "@apollo/server";
import { FriendRequestAPI } from "../dataSource/friendRequest.api";
import { PostAPI } from "../dataSource/post.api";
import { verifyToken } from "./auth0";
import { JwtPayload } from "jsonwebtoken";

export const createContext: (
  args: ExpressContextFunctionArgument,
  server: ApolloServer<BaseContext>
) => Promise<any> = async ({ req, res }, server) => {
  let isAuthenticated = false;

  try {
    const user = req.userInfo;

    // get the request from the request
    const headerToken = req.headers.authorization || "";
    const token = headerToken.split(" ")[1];
    const { cache } = server;
    // if there is a token verify it,
    const payload = (await verifyToken(token || " ")) as JwtPayload;
    // if there is no payload, it means the token is invalid or expired
    isAuthenticated = payload?.decoded ? true : false;
    return {
      dataSources: {
        userAPI: new UserAPI({ cache }, token),
        friendReqAPI: new FriendRequestAPI({ cache }, token),
        postAPI: new PostAPI({ cache }, token),
        isAuthenticated,
        user: {},
      },
    };
  } catch (error) {
    return {
      dataSources: { isAuthenticated },
    };
  }
};
