import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { verifyAdmin } from "../middlewares/admin.middlewares.js";
import {
  blockUser,
  fetchAllOrders,
  fetchAllUsers,
  getAdminOrderById,
  getDashboardStats,
  unBlockUser,
  updateOrderStatus,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.get("/", verifyToken, verifyAdmin, (req, res) => {
  res.send({ title: "Admin page" });
});
router.get("/users", verifyToken, verifyAdmin, fetchAllUsers);
router.get("/dashboard", verifyToken, verifyAdmin, getDashboardStats);
router.get("/orders", verifyToken, verifyAdmin, fetchAllOrders);
router.patch("/block/:id", verifyToken, verifyAdmin, blockUser);
router.patch("/unblock/:id", verifyToken, verifyAdmin, unBlockUser);
router.patch("/orders/:id", verifyToken, verifyAdmin, updateOrderStatus);
router.get("/orders/:id", verifyToken, getAdminOrderById);
export default router;
