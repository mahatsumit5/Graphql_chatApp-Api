"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.startApolloServer = startApolloServer;
const ws_1 = require("graphql-ws/dist/use/ws");
const session_query_1 = require("../database/session.query");
const __1 = require("..");
const server_1 = require("@apollo/server");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const formatError_1 = require("../utils/formatError");
const index_1 = require("../middleware/index");
const express4_1 = require("@apollo/server/express4");
const utils_1 = require("../utils");
const redis_1 = require("../redis");
const schema_1 = require("@graphql-tools/schema");
const typedefs_1 = require("../typedefs");
const resolvers_1 = require("../resolvers");
const context_1 = require("../utils/context");
const ws_2 = require("ws");
const schema = (0, schema_1.makeExecutableSchema)({
    resolvers: resolvers_1.resolvers,
    typeDefs: typedefs_1.typeDefs,
});
async function startApolloServer() {
    const wsServer = new ws_2.WebSocketServer({
        server: __1.httpServer,
        path: "/graphql",
    });
    const wsServerCleanup = (0, ws_1.useServer)({
        schema,
        onConnect: async (ctx) => {
            if (!ctx.connectionParams?.Authorization)
                throw new Error("Auth token missing!");
            const { data, error } = await (0, session_query_1.getSession)(`Bearer ${ctx.connectionParams.Authorization}`);
            if (error)
                throw new Error("User not found!");
            __1.onlineUsers.set(data.associate?.id, data.associate);
            __1.pubsub.publish("ONLINE_USERS", {
                onlineUsers: [...__1.onlineUsers.values()],
            });
        },
        async onDisconnect(ctx, code, reason) {
            const { data } = await (0, session_query_1.getSession)(`Bearer ${ctx.connectionParams.Authorization}`);
            console.log("Disconnected!", reason);
            __1.onlineUsers.delete(data.associate.id);
            __1.pubsub.publish("ONLINE_USERS", {
                onlineUsers: [...__1.onlineUsers.values()],
            });
        },
        context: async (ctx, msg, args) => {
            return {
                pubsub: __1.pubsub,
            };
        },
    }, wsServer);
    const server = new server_1.ApolloServer({
        schema,
        status400ForVariableCoercionErrors: true,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer: __1.httpServer }),
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
        formatError: (err) => (0, formatError_1.formatError)(err.extensions, err.message),
    });
    await server.start();
    await redis_1.redisClient.connect();
    __1.app.use("/graphql", index_1.auth0Middleware, index_1.loggedInUserAuth, (0, express4_1.expressMiddleware)(server, {
        context: (arg) => (0, context_1.createContext)(arg, server),
    }));
    __1.app.use(utils_1.ErrorHandler);
}
