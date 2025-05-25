"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.redisClient = void 0;
exports.getOrSetCache = getOrSetCache;
const redis_1 = require("redis");
exports.redisClient = (0, redis_1.createClient)({});
exports.redisClient.on("error", (err) => console.log("Redis Client Error", err));
exports.redisClient.on("connect", () => console.log("Redis Client Connected"));
exports.redisClient.on("ready", () => console.log("Redis Client Ready"));
exports.redisClient.on("end", () => console.log("Redis Client Disconnected"));
async function getOrSetCache(key, expiryInSeconds, cb) {
    const data = await exports.redisClient.get(key);
    if (data != null) {
        return JSON.parse(data);
    }
    const newData = await cb();
    await exports.redisClient.setEx(key, expiryInSeconds, JSON.stringify(newData));
    return newData;
}
