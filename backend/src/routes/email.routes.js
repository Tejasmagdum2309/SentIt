import { Router } from "express";
import { sendEmailController } from "../controllers/email.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/send", requireAuth, sendEmailController);

export default router;