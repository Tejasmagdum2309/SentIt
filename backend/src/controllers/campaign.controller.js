import {
  createCampaign,
  getCampaignsByUserId,
  updateCampaignById,
} from "../services/campaign.service.js";

export const getCampaignsController = async (req, res) => {
  try {
    const campaigns = await getCampaignsByUserId(req.user.id);

    return res.status(200).json({
      success: true,
      message: "Campaigns fetched successfully",
      data: campaigns,
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
    console.log(req.body);
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
    const { id } = req.params;
    const { campaignName, campaignDescription } = req.body;

    const campaign = await updateCampaignById({
      id,
      userId: req.user.id,
      campaignName,
      campaignDescription,
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
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};