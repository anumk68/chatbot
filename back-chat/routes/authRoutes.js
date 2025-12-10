import express from "express";
const router = express.Router();
import {
  signup,
  login,
  logout,
  forgotPassword,
  resetPassword,googleLogin,facebookLogin
} from "../controllers/authController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", verifyToken, logout);

router.post("/google-login", googleLogin);

router.post("/facebook-login", facebookLogin);


router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
export default router;
