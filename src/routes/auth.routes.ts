import { Router } from "express";
import { requireAuth } from "../middleware/auth.js";
import * as AuthController from "../controllers/auth.controller.js";

const router = Router();

// Delegate logic to controller functions for clarity and testability
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", requireAuth, AuthController.me);

export default router;

