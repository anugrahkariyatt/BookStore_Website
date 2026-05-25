import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/admin.middlewares.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  res.send({ title: "Admin page" });
});

export default router;
