import express from "express";
import multer from "multer";
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
  fetchBookByFilter,
  getUniqueAuthors,
} from "../controllers/book.controller.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });
router.post("/createbook", upload.single("coverImage"), createBook);

router.get("/getBooks", getBooks);
router.get("/all", fetchAllBooks);
router.get("/filter", fetchBookByFilter);
router.get("/book-by-category/:id", fetchBookByCategory);
router.get("/authors", getUniqueAuthors);
router.get("/book-by-sold", fetchBookBySold);
router.get("/book-by-new", fetchBookByNew);
router.get("/:id", getSingleBook);
router.patch("/:id", upload.single("coverImage"), updateBook);
router.delete("/:id", deleteBook);

export default router;
