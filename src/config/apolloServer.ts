import { useServer } from "graphql-ws/dist/use/ws";
import { getSession } from "../database/session.query";
import { app, onlineUsers, pubsub, httpServer } from "..";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { formatError } from "../utils/formatError";
import { auth0Middleware, loggedInUserAuth } from "../middleware/index";
import { expressMiddleware } from "@apollo/server/express4";
import { ErrorHandler } from "../utils";
import { redisClient } from "../redis";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "../typedefs";
import { resolvers } from "../resolvers";
import { createContext } from "../utils/context";
import { WebSocketServer } from "ws";
import {
  deleteComment,
  getCommentsByPostId,
  postComment,
} from "../database/comment.query";

const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

export async function startApolloServer() {
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: "/graphql",
  });
  const wsServerCleanup = useServer(
    {
      schema,
      onConnect: async (ctx) => {
        // Check authentication every time a client connects.
        if (!ctx.connectionParams?.Authorization)
          throw new Error("Auth token missing!");

        const { data, error } = await getSession(
          `Bearer ${ctx.connectionParams.Authorization}`
        );
        if (error) throw new Error("User not found!");

        onlineUsers.set(data.associate?.id, data.associate);
        pubsub.publish("ONLINE_USERS", {
          onlineUsers: [...onlineUsers.values()],
        });
      },
      async onDisconnect(ctx, code, reason) {
        const { data } = await getSession(
          `Bearer ${ctx.connectionParams.Authorization}`
        );
        console.log("Disconnected!", reason);
        onlineUsers.delete(data.associate.id);
        pubsub.publish("ONLINE_USERS", {
          onlineUsers: [...onlineUsers.values()],
        });
      },
      context: async (ctx, msg, args) => {
        return {
          pubsub,
        }; // Cast wsServer to any to avoid type error
      },
    },
    wsServer
  );
  const server = new ApolloServer({
    schema,
    status400ForVariableCoercionErrors: true,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await wsServerCleanup.dispose();
            },
          };
        },
      },
    ],
    formatError: (err) => formatError(err.extensions, err.message),
  });
  await server.start();
  await redisClient.connect();
  app.use(
    "/graphql",
    auth0Middleware,
    loggedInUserAuth,
    expressMiddleware(server, {
      context: (arg) => createContext(arg, server),
    })
  );

  app.use(ErrorHandler);
}
