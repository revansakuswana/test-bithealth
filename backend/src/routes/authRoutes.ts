import { Router } from "express";
import {
  login,
  logout,
  register,
  getProfile,
} from "../controllers/authController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/profile", authMiddleware, getProfile);

export default router;
