import { createClient } from "redis";
export const redisClient = createClient({});

redisClient.on("error", (err) => console.log("Redis Client Error", err));
redisClient.on("connect", () => console.log("Redis Client Connected"));
redisClient.on("ready", () => console.log("Redis Client Ready"));
redisClient.on("end", () => console.log("Redis Client Disconnected"));
type getOrSetCacheFn = (
  key: string,
  expiryInSeconds: number,
  cb: () => Promise<any>
) => Promise<any>;
export const getOrSetCache: getOrSetCacheFn = async (
  key: string,
  expiryInSeconds: number,
  cb: () => Promise<any>
) => {
  try {
    const data = await redisClient.get(key);
    if (data != null) {
      console.log("Sending data from cache");
      return JSON.parse(data as string);
    }

    const freshData = await cb();
    console.log("loading fresh data");
    await redisClient.setEx(key, expiryInSeconds, JSON.stringify(freshData));
    return freshData;
  } catch (error) {
    console.log(error);
  }
};
