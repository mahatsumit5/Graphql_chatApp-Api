import { getSession } from "../database/session.query.js";
import { app, onlineUsers, pubsub, httpServer } from "../index.js";
import { ApolloServer } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { formatError } from "../utils/formatError.js";
import { auth0Middleware, loggedInUserAuth } from "../middleware/index.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ErrorHandler } from "../utils/index.js";
import { redisClient } from "../redis/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDefs } from "../typedefs/index.js";
import { resolvers } from "../resolvers/index.js";
import { createContext } from "../utils/context.js";
import { WebSocketServer } from "ws";
import { useServer } from "graphql-ws/use/ws";
const schema = makeExecutableSchema({
    resolvers,
    typeDefs,
});
export async function startApolloServer() {
    const wsServer = new WebSocketServer({
        server: httpServer,
        path: "/graphql",
    });
    const wsServerCleanup = useServer({
        schema,
        onConnect: async (ctx) => {
            if (!ctx.connectionParams?.Authorization)
                throw new Error("Auth token missing!");
            const { data, error } = await getSession(`Bearer ${ctx.connectionParams.Authorization}`);
            if (!data?.associate)
                throw new Error("User not found!");
            onlineUsers.set(data.associate?.id, data.associate);
            pubsub.publish("ONLINE_USERS", {
                onlineUsers: [...onlineUsers.values()],
            });
        },
        async onDisconnect(ctx, code, reason) {
            const { data } = await getSession(`Bearer ${ctx.connectionParams.Authorization}`);
            console.log("Disconnected!", reason);
            onlineUsers.delete(data.associate.id);
            pubsub.publish("ONLINE_USERS", {
                onlineUsers: [...onlineUsers.values()],
            });
        },
        context: async (ctx, msg, args) => {
            return {
                pubsub,
            };
        },
    }, wsServer);
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
    app.use("/graphql", auth0Middleware, loggedInUserAuth, expressMiddleware(server, {
        context: (arg) => createContext(arg, server),
    }));
    app.use(ErrorHandler);
}
