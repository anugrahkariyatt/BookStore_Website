import express from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/categories.controller.js";

const router = express.Router();

router.post("/createcategory", createCategory);
router.get("/", getCategories);
router.patch("/:id", updateCategory);
router.delete("/", deleteCategory);

export default router;
