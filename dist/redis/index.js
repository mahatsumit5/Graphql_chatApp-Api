import { createClient } from "redis";
export const redisClient = createClient({});
redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("ready", () => console.log("Redis Client Ready"));
redisClient.on("end", () => console.log("Redis Client Disconnected"));
export async function getOrSetCache(key, expiryInSeconds, cb) {
    const data = await redisClient.get(key);
    if (data != null) {
        return JSON.parse(data);
    }
    const newData = await cb();
    await redisClient.setEx(key, expiryInSeconds, JSON.stringify(newData));
    return newData;
}
