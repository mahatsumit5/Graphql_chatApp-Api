"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpServer = exports.app = exports.pubsub = exports.onlineUsers = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const utils_1 = require("./utils");
const public_router_1 = __importDefault(require("./restApi/router/public.router"));
const file_upload_router_1 = __importDefault(require("./restApi/router/file.upload.router"));
const index_1 = require("./middleware/index");
const graphql_subscriptions_1 = require("graphql-subscriptions");
const apolloServer_1 = require("./config/apolloServer");
const os_1 = __importDefault(require("os"));
exports.onlineUsers = new Map();
exports.pubsub = new graphql_subscriptions_1.PubSub();
exports.app = (0, express_1.default)();
exports.httpServer = http_1.default.createServer(exports.app);
const PORT = Number(process.env.PORT) || 8000;
const options = {
    origin: [
        process.env.WEB_DOMAIN,
        "http://192.168.20.6:5173",
        "http://localhost:5173",
        "https://daisy-ui-chat-app.vercel.app/",
    ],
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    allowedHeaders: ["Authorization", "refreshjwt", "Content-Type", "test"],
    credentials: true,
};
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)(options));
exports.app.use("/api/v1/user", public_router_1.default);
exports.app.use("/api/v1/post", index_1.loggedInUserAuth, file_upload_router_1.default);
exports.app.use(utils_1.ErrorHandler);
(0, apolloServer_1.startApolloServer)();
function getLocalIPAddress() {
    const interfaces = os_1.default.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
        for (const iface of interfaces[name]) {
            if (iface.family === "IPv4" && !iface.internal) {
                return iface.address;
            }
        }
    }
    return "127.0.0.1";
}
const host = getLocalIPAddress();
exports.httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://${host}:${PORT}/graphql`);
});
