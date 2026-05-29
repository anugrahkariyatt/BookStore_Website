import express from "express";

// import { verifyToken, verifyAdmin } from "../middlewares/auth.middlewares.js";
import {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  fetchAllBooks,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/createbook", createBook);

router.get("/", getBooks);
router.get("/all", fetchAllBooks);
router.get("/:id", getSingleBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
