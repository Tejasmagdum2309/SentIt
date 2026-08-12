import { Worker } from "bullmq";
import { getCampaignById, getCampaignEmails } from "../services/campaign.service.js";
import { sendCampaignEmailsInBackground } from "../services/email.service.js";
import { getUserById } from "../services/user.service.js";
import redisConnection from "../config/redis.js";

export const campaignWorker = new Worker(
  "campaigns",
  async (job) => {
    const { campaignId, userId } = job.data;
    console.log(`Processing campaign ${campaignId}`);

    const campaign = await getCampaignById({ id: campaignId });

    if (!campaign) {
      throw new Error(`Campaign ${campaignId} not found`);
    }

    if (campaign.userId !== userId) {
      throw new Error(`Campaign ${campaignId} does not belong to user ${userId}`);
    }

    if (campaign.campaignStatus === "SENT") {
      console.log(`Campaign ${campaignId} already sent, skipping`);
      return;
    }

    const emails = await getCampaignEmails({ campaignId, userId });

    if (!emails || emails.length === 0) {
      throw new Error(`No emails found for campaign ${campaignId}`);
    }

    const user = await getUserById(userId);

    if (!user) {
      throw new Error(`User ${userId} not found`);
    }

    await sendCampaignEmailsInBackground({
      campaign,
      emails,
      user,
    });
  },
  {
    connection: redisConnection,
    concurrency: 2,
  }
);

campaignWorker.on("completed", (job) => {
  console.log(`Campaign ${job.data?.campaignId} completed`);
});

campaignWorker.on("failed", (job, err) => {
  console.error(`Campaign ${job?.data?.campaignId} failed:`, err.message);
});

campaignWorker.on("error", (err) => {
  console.error("Worker error:", err);
});
