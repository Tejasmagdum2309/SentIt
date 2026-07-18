import { Router } from "express";
import { createCampaignController, getCampaignsController, updateCampaignController } from "../controllers/campaign.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.get("/", requireAuth, getCampaignsController);
router.post("/", requireAuth, createCampaignController);
router.put("/:id", requireAuth, updateCampaignController);

export default router;