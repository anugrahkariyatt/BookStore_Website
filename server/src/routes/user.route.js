import express from "express";
import {
  getProfile,
  login,
  logout,
  me,
  signup,
  updateProfile,
  verifyPassword,
  updatePassword,
} from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ title: "BookStore" });
});
router.post("/signup", signup);
router.post("/me", verifyToken, me);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", verifyToken, getProfile);
router.put("/profile/update", verifyToken, updateProfile); // NEW
router.post("/profile/verify-password", verifyToken, verifyPassword); // NEW
router.put("/profile/update-password", verifyToken, updatePassword);
router.get("/home", verifyToken, (req, res) => {
  res.status(200).json({});
});

export default router;
