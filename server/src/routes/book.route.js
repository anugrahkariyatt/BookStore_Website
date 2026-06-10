import express from "express";

// import { verifyToken, verifyAdmin } from "../middlewares/auth.middlewares.js";
import {
  createBook,
  getBooks,
  getSingleBook,
  updateBook,
  deleteBook,
  fetchAllBooks,
  fetchBookByCategory,
  fetchBookBySold,
  fetchBookByNew,
} from "../controllers/book.controller.js";

const router = express.Router();

router.post("/createbook", createBook);

router.get("/", getBooks);
router.get("/all", fetchAllBooks);
router.get("/book-by-category/:id", fetchBookByCategory);
router.get("/book-by-sold", fetchBookBySold);
router.get("/book-by-new", fetchBookByNew);
router.get("/:id", getSingleBook);
router.patch("/:id", updateBook);
router.delete("/:id", deleteBook);

export default router;
