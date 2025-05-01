import { createClient } from "redis";
export const redisClient = createClient({});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("ready", () => console.log("Redis Client Ready"));
redisClient.on("end", () => console.log("Redis Client Disconnected"));
