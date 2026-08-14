import { Queue } from "bullmq";
import redisConnection from "../config/redis.js";

export const campaignQueue = new Queue("campaigns", { connection: redisConnection });