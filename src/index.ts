import { ApolloServer } from "@apollo/server";
import { config } from "dotenv";
config();
import http, { request } from "http";
import express from "express";
import { WebSocketServer } from "ws";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { useServer } from "graphql-ws/dist/use/ws";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import cors from "cors";
import { typeDefs } from "./typedefs";
import { createContext } from "./utils";
import { resolvers } from "./resolvers";
import { ApolloServerErrorCode } from "@apollo/server/errors";
import publicApi from "./public/router/public.router";
import { auth } from "express-oauth2-jwt-bearer";
import { loggedInUserAuth } from "./middleware";
import { ErrorHandler } from "./utils/errorHandler";
// import { applyMiddleware } from "graphql-middleware";
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
// public route
app.use("/api/v1/user", publicApi);
app.use(ErrorHandler);
async function main() {
  const wsServerCleanup = useServer(
    {
      schema,
      onConnect: async (ctx) => {
        // Check authentication every time a client connects.
        if (!ctx.connectionParams?.authorization) {
          // You can return false to close the connection  or throw an explicit error
          throw new Error("Auth token missing!");
        }
      },
      onDisconnect(ctx, code, reason) {
        console.log("Disconnected!");
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
    formatError(formattedError, error) {
      if (
        formattedError.extensions.code === ApolloServerErrorCode.BAD_USER_INPUT
      ) {
        return {
          code: formattedError.extensions.code,
          message: "Invalid input",
        };
      } else if (
        formattedError.extensions.code ===
        ApolloServerErrorCode.INTERNAL_SERVER_ERROR
      ) {
        return {
          code: formattedError.extensions.code,
          message: "Internal server error",
        };
      }
      return formattedError;
    },
  });
  await server.start();

  app.use(
    "/graphql",
    auth0Middleware,
    loggedInUserAuth,

    expressMiddleware(server, { context: (arg) => createContext(arg, server) })
  );
}
main();

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
