import express from "express";
import { verifyToken } from "../middlewares/auth.middlewares.js";
import { addToCart } from "../controllers/cart.controller.js";

const router = express.Router();

router.post("/:id", verifyToken, addToCart);
// router.get("/", getCategories);
// router.patch("/:id", updateCategory);
// router.delete("/:id", deleteCategory);

export default router;
