import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import {
  addToCart,
  deletedOneItem,
  fetchAllItemsByUserId,
  updateQuantity,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/:id", verifyToken, addToCart);
router.get("/", verifyToken, fetchAllItemsByUserId);
router.patch("/:id", verifyToken, updateQuantity);
router.delete("/:id", verifyToken, deletedOneItem);
// router.delete("/clear");

export default router;
