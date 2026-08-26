import { Router } from "express";
import { restoreScheduledCampaignsController } from "../controllers/campaign-restore.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post(
  "/restore-scheduled",
  requireAuth,
  restoreScheduledCampaignsController
);

export default router;
