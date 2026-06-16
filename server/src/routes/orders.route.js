import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import {
  cancelOrder,
  createOrder,
  fetchMyOrders,
  getOrderById,
  //   fetchOrderById,
  //   updateOrderStatus,
} from "../controllers/orders.controller.js";

const router = express.Router();

// Create order
router.post("/:id", verifyToken, createOrder);

// User/Admin orders
router.get("/", verifyToken, fetchMyOrders);

router.patch("/:id/cancel", verifyToken, cancelOrder);
// Single order
router.get("/:id", verifyToken, getOrderById);
// // Admin
// router.patch("/:id/status", verifyToken, updateOrderStatus);

export default router;
