import { restoreScheduledCampaigns } from "../services/campaign-restore.service.js";

export const restoreScheduledCampaignsController = async (req, res) => {
  try {
    const result = await restoreScheduledCampaigns();

    return res.status(200).json({
      success: true,
      message: "Scheduled campaign jobs restored",
      data: result,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};
