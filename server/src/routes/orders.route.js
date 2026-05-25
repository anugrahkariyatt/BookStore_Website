import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { createOrder, fetchOrders } from "../controllers/orders.controller.js";

const router = express.Router();

router.post("/:id", verifyToken, createOrder);
router.get("/", fetchOrders);
// router.patch("/:id");
// router.get("/:id");

export default router;
