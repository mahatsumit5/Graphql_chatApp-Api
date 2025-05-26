import { config } from "dotenv";
config();
import http from "http";
import express from "express";
import cors from "cors";
import { ErrorHandler } from "./utils/index.js";
import publicApi from "./restApi/router/public.router.js";
import fileUploadApi from "./restApi/router/file.upload.router.js";
import { loggedInUserAuth } from "./middleware/index.js";
import { PubSub } from "graphql-subscriptions";
import { startApolloServer } from "./config/apolloServer.js";
import os from "os";
export const onlineUsers = new Map();
export const pubsub = new PubSub();
export const app = express();
export const httpServer = http.createServer(app);
const PORT = Number(process.env.PORT) || 8000;
const options = {
    origin: [process.env.WEB_DOMAIN],
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    allowedHeaders: ["Authorization", "refreshjwt", "Content-Type", "test"],
    credentials: true,
};
app.use(express.json());
app.use(cors({
    origin: [
        process.env.WEB_DOMAIN,
        "http://localhost:5173",
        "http://localhost:3000",
    ],
    methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
    allowedHeaders: [
        "Authorization",
        "refreshjwt",
        "Content-Type",
        "test",
        "Access-Control-Allow-Origin",
    ],
}));
app.use("/api/v1/user", publicApi);
app.use("/api/v1/post", loggedInUserAuth, fileUploadApi);
app.use(ErrorHandler);
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Welcome to the Daisy UI Chat App API",
        version: "1.0.0",
    });
});
startApolloServer();
function getLocalIPAddress() {
    const interfaces = os.networkInterfaces();
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
httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
