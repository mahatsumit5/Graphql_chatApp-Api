import { config } from "dotenv";
config();
import http from "http";
import express from "express";
import cors from "cors";
import { ErrorHandler } from "./utils";
import publicApi from "./restApi/router/public.router";
import fileUploadApi from "./restApi/router/file.upload.router";
import { loggedInUserAuth } from "./middleware/index";
import { PubSub } from "graphql-subscriptions";
import { User } from "./types/types";
import { startApolloServer } from "./config/apolloServer";

export const onlineUsers = new Map<string, User>();
export const pubsub = new PubSub();
export const app = express();
export const httpServer = http.createServer(app);
const PORT = Number(process.env.PORT) || 8000;
const options = {
  origin: [
    process.env.WEB_DOMAIN as string,
    "http://192.168.20.8:5173",
    "http://localhost:5173",
    "https://daisy-ui-chat-app.vercel.app/",
  ],
  methods: ["GET", "PUT", "PATCH", "DELETE", "POST"],
  allowedHeaders: ["Authorization", "refreshjwt", "Content-Type", "test"],
  credentials: true,
};

app.use(express.json());
app.use(cors<cors.CorsRequest>(options));

app.use("/api/v1/user", publicApi);
app.use("/api/v1/post", loggedInUserAuth, fileUploadApi);
app.use(ErrorHandler);

startApolloServer();

httpServer.listen(PORT, () => {
  console.log(`Server is now running on http://localhost:${PORT}/graphql`);
});
