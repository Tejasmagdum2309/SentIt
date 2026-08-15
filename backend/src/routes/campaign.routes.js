import { Router } from "express";
import {
  createCampaignController,
  getCampaignsController,
  getCampaignController,
  getCampaignStatsController,
  uploadCampaignFileController,
  updateCampaignController,
  getCampaignEmailsController,
  sendCampaignEmailController,
  getCampaignEmailController,
} from "../controllers/campaign.controller.js";
import { handleCampaignUpload } from "../middleware/campaign-upload.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import {uploadLimiter} from "../middleware/rateLimiter.js";
import {
  campaignEmailParamsSchema,
  campaignIdParamSchema,
  createCampaignBodySchema,
  listCampaignsQuerySchema,
  sendCampaignBodySchema,
  updateCampaignBodySchema,
} from "../validations/campaign.validation.js";

const router = Router();

router.get(
  "/",
  requireAuth,
  validate({ query: listCampaignsQuerySchema }),
  getCampaignsController
);
router.get("/stats", requireAuth, getCampaignStatsController);
// Must stay below "/stats" so that path is not matched as a campaign id.
router.get(
  "/:campaignId",
  requireAuth,
  validate({ params: campaignIdParamSchema }),
  getCampaignController
);
router.post(
  "/",
  requireAuth,
  validate({ body: createCampaignBodySchema }),
  createCampaignController
);
router.patch(
  "/:campaignId",
  requireAuth,
  validate({
    params: campaignIdParamSchema,
    body: updateCampaignBodySchema,
  }),
  updateCampaignController
);
router.post(
  "/:campaignId/upload",
  uploadLimiter,
  requireAuth,
  validate({ params: campaignIdParamSchema }),
  handleCampaignUpload,
  uploadCampaignFileController
);

router.get(
  "/:campaignId/emails",
  requireAuth,
  validate({ params: campaignIdParamSchema }),
  getCampaignEmailsController
);


// just for trial
router.post(
  "/:campaignId/email/:emailId/send",
  requireAuth,
  validate({ params: campaignEmailParamsSchema }),
  getCampaignEmailController
);

router.post(
  "/:campaignId/send",
  requireAuth,
  validate({
    params: campaignIdParamSchema,
    body: sendCampaignBodySchema,
  }),
  sendCampaignEmailController
);



export default router;
