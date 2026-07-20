import { Router } from "express";
import {
  createCampaignController,
  getCampaignsController,
  uploadCampaignFileController,
  updateCampaignController,
} from "../controllers/campaign.controller.js";
import { handleCampaignUpload } from "../middleware/campaign-upload.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getCampaignsController);
router.post("/", requireAuth, createCampaignController);
router.patch("/:campaignId", requireAuth, updateCampaignController);
router.post("/:campaignId/upload", requireAuth, handleCampaignUpload, uploadCampaignFileController);

router.post("/:campaignId/send", (req, res) => {
  // Respond immediately
  res.status(202).json({
    success: true,
    message: `Campaign ${req.params.campaignId} started successfully. Processing in the background...`,
  });

  // Background task
  (async () => {
    console.log("Starting campaign... " + req.params.campaignId);

    for (let i = 1; i <= 4; i++) {
      // Simulate API call
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log(`API call completed for email ${i} of campaign ${req.params.campaignId}.`);
          resolve();
        }, 2000);
      });

      // Simulate email sending
      await new Promise((resolve) => {
        setTimeout(() => {
          console.log(`Email ${i} sent successfully. Campaign ${req.params.campaignId} completed.`);
          resolve();
        }, 2000);
      });
    }

    console.log("Campaign completed." + req.params.campaignId);
  })();
});



export default router;