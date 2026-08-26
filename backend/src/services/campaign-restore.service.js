import prisma from "../config/prisma.js";
import { campaignQueue } from "../queues/campaign.queue.js";

const JOB_NAME = "start-campaign";
const ACTIVE_JOB_STATES = new Set([
  "active",
  "waiting",
  "delayed",
  "paused",
  "waiting-children",
]);

const campaignJobId = (campaignId) => `campaign-${campaignId}`;

export const restoreScheduledCampaigns = async () => {
  const campaigns = await prisma.campaign.findMany({
    where: {
      campaignStatus: "SCHEDULED",
      scheduledAt: {
        not: null,
      },
    },
  });

  const restored = [];
  const skipped = [];
  const failed = [];

  for (const campaign of campaigns) {
    const jobId = campaignJobId(campaign.id);

    try {
      const existingJob = await campaignQueue.getJob(jobId);

      if (existingJob) {
        const existingJobState = await existingJob.getState();
        // This will not happns in most cases...
        if (ACTIVE_JOB_STATES.has(existingJobState)) {
          skipped.push({
            campaignId: campaign.id,
            reason: `job already ${existingJobState}`,
          });
          continue;
        }

        await existingJob.remove();
      }

      const delay = Math.max(
        new Date(campaign.scheduledAt).getTime() - Date.now(),
        0
      );

      await campaignQueue.add(
        JOB_NAME,
        {
          campaignId: campaign.id,
          userId: campaign.userId,
        },
        {
          jobId,
          delay,
        }
      );

      restored.push({
        campaignId: campaign.id,
        delay,
        scheduledAt: campaign.scheduledAt,
      });
    } catch (error) {
      failed.push({
        campaignId: campaign.id,
        reason: error.message,
      });
    }
  }

  return {
    total: campaigns.length,
    restored,
    skipped,
    failed,
  };
};
