"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const ws_1 = require("ws");
const schema_1 = require("@graphql-tools/schema");
const ws_2 = require("graphql-ws/dist/use/ws");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
const cors_1 = __importDefault(require("cors"));
const typedefs_1 = require("./typedefs");
const utils_1 = require("./utils");
const resolvers_1 = require("./resolvers");
const errors_1 = require("@apollo/server/errors");
const app = (0, express_1.default)();
const httpServer = http_1.default.createServer(app);
const PORT = Number(process.env.PORT) || 8000;
const options = {
    origin: [
        process.env.WEB_DOMAIN,
        "http://192.168.20.8:5173",
        "http://localhost:5173",
    ],
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    allowedHeaders: ["Authorization", "refreshjwt", "Content-Type"],
    credentials: true,
};
const schema = (0, schema_1.makeExecutableSchema)({
    resolvers: resolvers_1.resolvers,
    typeDefs: typedefs_1.typeDefs,
});
const wsServer = new ws_1.WebSocketServer({
    server: httpServer,
    path: "/graphql",
});
async function main() {
    const wsServerCleanup = (0, ws_2.useServer)({
        schema,
        onConnect: async (ctx) => {
            if (!ctx.connectionParams?.authorization) {
                throw new Error("Auth token missing!");
            }
        },
        onDisconnect(ctx, code, reason) {
            console.log("Disconnected!");
        },
    }, wsServer);
    const server = new server_1.ApolloServer({
        schema,
        status400ForVariableCoercionErrors: true,
        plugins: [
            (0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer }),
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
            console.log("formattedError", formattedError);
            console.log("error", error);
            if (formattedError.extensions.code === errors_1.ApolloServerErrorCode.BAD_USER_INPUT) {
                return {
                    code: formattedError.extensions.code,
                    message: "Invalid input",
                };
            }
            return formattedError;
        },
    });
    await server.start();
    app.use("/graphql", express_1.default.json(), (0, cors_1.default)(options), (0, express4_1.expressMiddleware)(server, { context: (arg) => (0, utils_1.createContext)(arg, server) }));
}
main();
httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
