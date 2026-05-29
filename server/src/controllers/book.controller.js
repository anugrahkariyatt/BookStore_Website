import BooksModel from "../models/books.model.js";

export const createBook = async (req, res) => {
  try {
    const bookDetails = req.body;
    if (!bookDetails) {
      return res.status(400).json({
        error: "Book details is required for create new Book",
      });
    }
    const book = await BooksModel.create(bookDetails);
    return res.status(201).json({
      message: "Book created successfully",
      Book: book,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const fetchAllBooks = async (req, res) => {
  try {
    const books = await BooksModel.find();
    return res
      .status(200)
      .json({ message: "Fetch all books successfully", books: books });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const getBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const books = await BooksModel.find().skip(skip).limit(limit).exec();
    const totalItems = await BooksModel.countDocuments({});
    const totalPages = Math.ceil(totalItems / limit);

    return res.status(200).json({
      message: "Fetch all books successfully",
      totalItems,
      page,
      totalPages,
      books,
      user: req.user,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const getSingleBook = async (req, res) => {
  try {
    const BookId = req.params.id;
    if (!BookId) {
      return res.status(400).json({ error: "Book is not provided" });
    }

    const book = await BooksModel.find({ _id: BookId });
    return res.status(201).json({
      message: "Fetch  books successfully",
      Book: book,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const updateBook = async (req, res) => {
  try {
    const BookId = req.params.id;
    if (!BookId) {
      return res.status(400).json({ error: "Book is not provided" });
    }
    const updatedBook = req.body;
    if (!updatedBook) {
      return res
        .status(400)
        .json({ error: "Book data is required for update" });
    }
    const book = await BooksModel.findByIdAndUpdate(BookId, updatedBook, {
      new: true,
    });
    return res.status(201).json({
      message: "Update book successfully",
      Book: book,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const deleteBook = async (req, res) => {
  try {
    const BookId = req.params.id;
    if (!BookId) {
      return res.status(400).json({ error: "Book is not provided" });
    }

    const book = await BooksModel.findByIdAndDelete(BookId);
    return res.status(201).json({
      message: "Deleted book successfully",
      Book: book,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
