import express from "express";
import { login, signup } from "../controllers/user.controller.js";
import { verifyToken } from "../middlewares/auth.middlewares.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.send({ title: "BookStore" });
});
router.post("/signup", signup);
router.post("/login", login);
router.get("/home", verifyToken,(req, res) => {
  res.status(200).json({  });
});

export default router;
