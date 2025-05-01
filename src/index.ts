import { ApolloServer } from "@apollo/server";
import { config } from "dotenv";
config();
import http from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/dist/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./typedefs";
import { createContext, ErrorHandler } from "./utils";
import { resolvers } from "./resolvers";
import publicApi from "./restApi/router/public.router";
import fileUploadApi from "./restApi/router/file.upload.router";
import { auth } from "express-oauth2-jwt-bearer";
import { loggedInUserAuth } from "./middleware";
import { formatError } from "./utils/formatError";
import { PubSub } from "graphql-subscriptions";
import { getSession } from "./database/session.query";
import { User } from "./types/types";
import { redisClient } from "./redis/index";

const app = express();
const httpServer = http.createServer(app);
const PORT = Number(process.env.PORT) || 8000;
const options = {
  origin: [
    process.env.WEB_DOMAIN as string,
    "http://192.168.20.8:5173",
    "http://localhost:5173",
  ],
  methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
  allowedHeaders: ["Authorization", "refreshjwt", "Content-Type"],
  credentials: true,
};
const onlineUsers = new Map<string, User>();
new Map<string, string>();
export const auth0Middleware = auth({
  audience: process.env.audience,
  issuerBaseURL: process.env.issuerBaseURL,
});
const schema = makeExecutableSchema({
  resolvers,
  typeDefs,
});

const wsServer = new WebSocketServer({
  server: httpServer,
  path: "/graphql",
});
app.use(express.json());
app.use(cors<cors.CorsRequest>(options));

app.use("/api/v1/user", publicApi);
app.use("/api/v1/post", loggedInUserAuth, fileUploadApi);
app.use(ErrorHandler);

export const pubsub = new PubSub();
async function startServer() {
  const wsServerCleanup = useServer(
    {
      schema,
      onConnect: async (ctx) => {
        // Check authentication every time a client connects.
        if (!ctx.connectionParams?.Authorization)
          throw new Error("Auth token missing!");

        const user = await getSession(
          `Bearer ${ctx.connectionParams.Authorization}`
        );
        if (!user) throw new Error("User not found!");

        onlineUsers.set(user.associate?.id, user.associate);
        pubsub.publish("ONLINE_USERS", {
          onlineUsers: [...onlineUsers.values()],
        });
      },
      async onDisconnect(ctx, code, reason) {
        const user = await getSession(
          `Bearer ${ctx.connectionParams.Authorization}`
        );
        console.log("Disconnected!", reason);
        onlineUsers.delete(user.associate?.id);
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
}
startServer();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err.message);
  console.error(err.stack);
});
process.on("unhandledRejection", (reason) => {
  console.error("❌ Unhandled Rejection:", reason);
});
httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
console.log("📁 Current working directory:", process.cwd());
