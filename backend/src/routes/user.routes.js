import { Router } from "express";
import { createUserController, getUsersController, getUserByEmailController } from "../controllers/user.controller.js";
import { requireAuth } from "../middleware/auth.middleware.js";

const router = Router();

// router.post("/", createUserController);
router.get("/me", requireAuth ,getUserByEmailController);

export default router;