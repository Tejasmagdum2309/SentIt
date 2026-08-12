import IORedis from "ioredis";
import "./env.js";

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
  throw new Error("Missing REDIS_URL environment variable");
}

const redisConnection = new IORedis(redisUrl, {
  maxRetriesPerRequest: null,
});

export default redisConnection;