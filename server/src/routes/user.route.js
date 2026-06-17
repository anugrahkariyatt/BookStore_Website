import express from "express";
import {
  getProfile,
  login,
  logout,
  me,
  signup,
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

router.get("/home", verifyToken, (req, res) => {
  res.status(200).json({});
});

export default router;
