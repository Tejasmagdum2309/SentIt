import {
  createCampaign,
  getCampaignsByUserId,
  getCampaignById,
  parseCampaignUploadFile,
  updateCampaignById,
  getCampaignEmails,
  getEmailById
} from "../services/campaign.service.js";

import { getUserByEmailWithRefreshToken } from "../services/user.service.js";

import {sendCampaignEmailsInBackground} from "../services/email.service.js";

import {sendEmail} from "../services/email.service.js";

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
      const { campaignI , emailId} = req.params;

  
      const email = await getEmailById({
        emailId,
        userId: req.user.id,
      });

  
      if (!email) {
        return res.status(404).json({
          success: false,
          message: "Email not found",
        });
      }

      const user = await getUserByEmailWithRefreshToken(req.user.email);


      await sendEmail({
        user: user,
        to: email.recipientEmail,
        subject: "Test",
        message: "Test Message",
      });
  
      // const emails = await getCampaignEmails({
      //   campaignId : campaignI,
      //   userId: req.user.id,
      // });
  
      // if (!emails) {
      //   return res.status(404).json({
      //     success: false,
      //     message: "Campaign not found",
      //   });
      // }
  
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

export const sendCampaignEmailController = async (req, res) => {
    try {
      const { campaignId } = req.params;


      const campaign = await getCampaignById({
        id : campaignId,
      });
  
      if (!campaign) {
        return res.status(404).json({
          success: false,
          message: "Campaign not found",
        });
      }

      const emails = await getCampaignEmails({
        campaignId : campaign.id,
        userId: req.user.id,
      });
  
      if (!emails) {
        return res.status(404).json({
          success: false,
          message: "No emails found",
        });
      }

     const user = await getUserByEmailWithRefreshToken(req.user.email);

      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
      
        // BackGround Process
     sendCampaignEmailsInBackground({
        campaign,
        emails,
        user,
      }).catch((err) => {
  console.error("Background email error:", err);
});



      return res.status(200).json({
        success: true,
        message: "Emails Seding in Progress... , Check after few seconds.",
      });

    }
    catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
}