import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/admin.middlewares.js";
import {
  blockUser,
  fetchAllUsers,
  unBlockUser,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  res.send({ title: "Admin page" });
});
router.get("/users", fetchAllUsers);
router.patch("/block/:id", blockUser);
router.patch("/unblock/:id", unBlockUser);

export default router;
