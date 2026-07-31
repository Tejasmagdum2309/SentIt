import { Router } from "express";
import {
  createCampaignController,
  getCampaignsController,
  getCampaignStatsController,
  uploadCampaignFileController,
  updateCampaignController,
  getCampaignEmailsController,
  sendCampaignEmailController,
  getCampaignEmailController,
} from "../controllers/campaign.controller.js";
import { handleCampaignUpload } from "../middleware/campaign-upload.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import {uploadLimiter} from "../middleware/rateLimiter.js";

const router = Router();

router.get("/", requireAuth, getCampaignsController);
router.get("/stats", requireAuth, getCampaignStatsController);
router.post("/", requireAuth, createCampaignController);
router.patch("/:campaignId", requireAuth, updateCampaignController);
router.post("/:campaignId/upload", uploadLimiter , requireAuth, handleCampaignUpload, uploadCampaignFileController);

router.get("/:campaignId/emails", requireAuth, getCampaignEmailsController);


// just for trial
router.post("/:campaignId/email/:emailId/send", requireAuth, getCampaignEmailController);

router.post("/:campaignId/send", requireAuth, sendCampaignEmailController);



export default router;