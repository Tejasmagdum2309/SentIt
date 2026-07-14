import { Router } from "express";
import {
	getGoogleAuthUrlController,
	googleCallbackController,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/google", getGoogleAuthUrlController);
router.get("/google/callback", googleCallbackController);

export default router;