import {
  createCampaign,
  getCampaignsByUserId,
  parseCampaignUploadFile,
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

    const parsedFile = await parseCampaignUploadFile({
      campaignId,
      userId: req.user.id,
      file: req.file,
    });

    if (!parsedFile) {
      return res.status(404).json({
        success: false,
        message: "Campaign not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "File uploaded Successfully , View The Next page for uploaded email.",
      data: parsedFile,
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message,
    });
  }
};