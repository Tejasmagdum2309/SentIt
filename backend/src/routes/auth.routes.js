import { Router } from "express";
import {
	getGoogleAuthUrlController,
	googleCallbackController,
} from "../controllers/auth.controller.js";
import { authLimiter } from "../middleware/rateLimiter.js";

const router = Router();

router.get("/google", authLimiter, getGoogleAuthUrlController);
router.get("/google/callback", authLimiter, googleCallbackController);

export default router;