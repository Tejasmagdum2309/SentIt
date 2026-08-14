import {
  createCampaign,
  getCampaignsByUserId,
  getCampaignStatsByUserId,
  getCampaignById,
  parseCampaignUploadFile,
  updateCampaignById,
  getCampaignEmails,
  getEmailById,
  getDispatchedCampaignCount,
  updateCampaignEmailById, 
  getCampaignEmailCount
} from "../services/campaign.service.js";

import { getUserByEmailWithRefreshToken } from "../services/user.service.js";

import {sendCampaignEmailsInBackground} from "../services/email.service.js";

import {sendEmail} from "../services/email.service.js";
import { campaignQueue } from "../queues/campaign.queue.js";
import {
  getUtcDayBounds,
  isValidTimeZone,
  parseScheduledAtToUtc,
} from "../utils/schedule.util.js";

const MAX_CAMPAIGNS_PER_DAY = 2;

export const getCampaignsController = async (req, res) => {
  try {
    const rawPage = req.query.page;
    const rawLimit = req.query.limit;
    const status = req.query.status;

    const page = rawPage !== undefined ? parseInt(rawPage, 10) : 1;
    const limit = rawLimit !== undefined ? parseInt(rawLimit, 10) : 10;

    if (Number.isNaN(page) || page < 1) {
      return res.status(400).json({
        success: false,
        message: "page must be a number greater than or equal to 1",
      });
    }

    if (Number.isNaN(limit) || limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: "limit must be a number between 1 and 100",
      });
    }

    if (status && !["DRAFT", "SENT"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'status must be "DRAFT" or "SENT"',
      });
    }

    const { campaigns, total } = await getCampaignsByUserId({
      userId: req.user.id,
      page,
      limit,
      status,
    });

    const totalPages = total === 0 ? 1 : Math.ceil(total / limit);

    return res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      data: campaigns,
      pagination: {
        page,
        limit,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCampaignController = async (req, res) => {
  try {
    const { campaignId } = req.params;

    const campaign = await getCampaignById({ id: campaignId });

    if (!campaign || campaign.userId !== req.user.id) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign fetched successfully",
      data: campaign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCampaignStatsController = async (req, res) => {
  try {
    const stats = await getCampaignStatsByUserId(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: stats,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const createCampaignController = async (req, res) => {
  try {
    const { campaignName, campaignDescription } = req.body;

    if (!campaignName) {
      return res.status(400).json({
        success: false,
        message: "campaignName is required",
      });
    }

    const campaign = await createCampaign({
      campaignName,
      campaignDescription,
      userId: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Campaign created successfully",
      data: campaign,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateCampaignController = async (req, res) => {
  try {
    const { campaignId : id } = req.params;
    const { campaignName, campaignDescription , emailSubject , emailBody } = req.body;

    const campaign = await updateCampaignById({
      id,
      userId: req.user.id,
      campaignName,
      campaignDescription,
      emailSubject,
      emailBody
    });

    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Campaign updated successfully",
      data: campaign,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};


export const uploadCampaignFileController = async (req, res) => {
  try {
    const { campaignId } = req.params;
    // Issue will occuer here will fix in next release --- Tejas
    const parsedFile = await parseCampaignUploadFile({
      campaignId,
      userId: req.user.id,
      file: req.file,
    });

    if(!parsedFile.success){
      return res.status(400).json({
        success: false,
        message: parsedFile.message,
        data: parsedFile?.data || null,
      });
    }

    if (!parsedFile) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded Successfully , View The Next page for uploaded email.",
      data: parsedFile.data,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCampaignEmailsController = async (req, res) => {
    try {
      const { campaignId } = req.params;

  
      const emails = await getCampaignEmails({
        campaignId,
        userId: req.user.id,
      });
  
      if (!emails) {
        return res.status(404).json({
          success: false,
          message: "Campaign not found",
        });
      }
  
      return res.status(200).json({
        success: true,
        message: "Emails fetched successfully",
        data: emails,
      });
    }
    catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
}

export const getCampaignEmailController = async (req, res) => {
  try {
    const { campaignId, emailId } = req.params;

    // 1. Get campaign
    const campaign = await getCampaignById({ id: campaignId });
    if (!campaign) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    // 2. Get campaign email
    const campaignEmail = await getEmailById({
      emailId,
      userId: req.user.id,
    });

    if (!campaignEmail || campaignEmail.campaignId !== campaignId) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    // Optional: same guard as background sender
    if (campaignEmail.status !== "FAILED") {
      return res.status(400).json({
        success: false,
        message: `Email already ${campaignEmail.status}`,
      });
    }

    const user = await getUserByEmailWithRefreshToken(req.user.email);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 3. Interpolate variables (same as email.service.js)
    let body = campaign.emailBody ?? "";
    for (const [key, value] of Object.entries(campaignEmail.variables || {})) {
      body = body.replaceAll(`{{${key}}}`, value ?? "");
    }

    // 4. Send mail
    try {
      const info = await sendEmail({
        user,
        to: campaignEmail.recipientEmail,
        subject: campaign.emailSubject,
        message: body,
      });

      await updateCampaignEmailById({
        id: campaignEmail.id,
        status: "SENT",
        messageId: info.messageId,
        sentAt: new Date(),
      });

      return res.status(200).json({
        success: true,
        message: "Email sent successfully",
        data: {
          emailId: campaignEmail.id,
          recipientEmail: campaignEmail.recipientEmail,
          messageId: info.messageId,
        },
      });
    } catch (error) {
      await updateCampaignEmailById({
        id: campaignEmail.id,
        status: "FAILED",
        errorMessage: error.message,
      });

      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sendCampaignEmailController = async (req, res) => {
    try {
      const { campaignId } = req.params;
      const { publishNow, scheduledAt, timeZone } = req.body;

      if (typeof publishNow !== "boolean") {
        return res.status(400).json({
          success: false,
          message: "publishNow is required and must be a boolean",
        });
      }

       const campaign = await getCampaignById({
        id : campaignId,
      });

      if (!campaign || campaign.userId !== req.user.id) {
        return res.status(404).json({
          success: false,
          message: "Campaign not found",
        });
      }

      if(campaign.campaignStatus === "SENT"){
        return res.status(404).json({
          success: false,
          message: "Campaign already sent",
        });
      }

      // Immediate sends dispatch now, scheduled ones dispatch at the requested
      // wall-clock time converted from the sender's time zone into UTC.
      let scheduledAtUtc = null;

      if (!publishNow) {
        if (!scheduledAt || !timeZone) {
          return res.status(400).json({
            success: false,
            message: "scheduledAt and timeZone are required For non publishNow campaigns",
          });
        }

        if (!isValidTimeZone(timeZone)) {
          return res.status(400).json({
            success: false,
            message: `timeZone "${timeZone}" is not a valid IANA time zone`,
          });
        }

        scheduledAtUtc = parseScheduledAtToUtc({ scheduledAt, timeZone });

        if (!scheduledAtUtc) {
          return res.status(400).json({
            success: false,
            message: "scheduledAt must be a wall-clock time like 2026-08-20T10:00",
          });
        }

        if (scheduledAtUtc.getTime() <= Date.now()) {
          return res.status(400).json({
            success: false,
            message: "scheduledAt must be in the future",
          });
        }
      }

      const dispatchAt = scheduledAtUtc ?? new Date();

      // The quota is one bucket per UTC calendar day, so an immediate send
      // counts against today while a scheduled send counts against its own day.
      const { dayStart, dayEnd } = getUtcDayBounds(dispatchAt);

      // Both already sent and still scheduled campaigns count against the quota,
      // so a user cannot queue up more than the limit for the same day either.
      const dispatchedCampaignsCount = await getDispatchedCampaignCount({
        userId: req.user.id,
        from: dayStart,
        to: dayEnd,
        excludeCampaignId: campaign.id,
      });

      if (dispatchedCampaignsCount >= MAX_CAMPAIGNS_PER_DAY) {
        return res.status(429).json({
          success: false,
          message: publishNow
            ? `You have already sent or scheduled ${MAX_CAMPAIGNS_PER_DAY} campaigns today...`
            : `You have already sent or scheduled ${MAX_CAMPAIGNS_PER_DAY} campaigns for that day...`,
        });
      }

      const emailsCount = await getCampaignEmailCount({
        campaignId : campaign.id,
        userId: req.user.id,
      });

      if (emailsCount === 0) {
        return res.status(404).json({
          success: false,
          message: "No emails found",
        });
      }

      // A fixed job id keeps one campaign to one job, so re-sending or
      // rescheduling replaces the pending job instead of adding a second one.
      const jobId = `campaign-${campaign.id}`;
      const existingJob = await campaignQueue.getJob(jobId);

      if (existingJob) {
        const existingJobState = await existingJob.getState();

        if (existingJobState === "active") {
          return res.status(409).json({
            success: false,
            message: "Campaign is already being sent",
          });
        }

        await existingJob.remove();
      }

      await updateCampaignById({
        id: campaign.id,
        userId: req.user.id,
        campaignStatus: "SCHEDULED",
        scheduledAt: scheduledAtUtc,
        timeZone: publishNow ? null : timeZone,
      });

      await campaignQueue.add("start-campaign", {
        campaignId : campaign.id,
        userId: req.user.id,
      },
    {
      jobId,
      delay : publishNow ? 0 : Math.max(scheduledAtUtc.getTime() - Date.now(), 0),
    });

      return res.status(200).json({
        success: true,
        message: publishNow
          ? "Campaign is added in the queue for sending emails. You will be notified when the emails are sent."
          : "Campaign scheduled successfully. Emails will be sent at the scheduled time.",
        data: {
          campaignId: campaign.id,
          publishNow,
          scheduledAt: scheduledAtUtc ? scheduledAtUtc.toISOString() : null,
          timeZone: publishNow ? null : timeZone,
        },
      });

    }
    catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
}