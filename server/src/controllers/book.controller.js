import BooksModel from "../models/books.model.js";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.config.js";
export const createBook = async (req, res) => {
  try {
    console.log("Reach here");

    const bookDetails = req.body;

    if (!bookDetails) {
      return res.status(400).json({
        error: "Book details is required for create new Book",
      });
    }
    let coverImageUrl = "";
    if (req.file) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "booK_cover" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });
      coverImageUrl = cloudinaryResult.secure_url;
    }
    const newBookData = { ...bookDetails, image: coverImageUrl };
    const book = await BooksModel.create(newBookData);
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
    const books = await BooksModel.find().populate("category", "name");
    return res
      .status(200)
      .json({ message: "Fetch all books successfully", books: books });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const fetchBookByFilter = async (req, res) => {
  try {
    const { categories, authors, minPrice, maxPrice, search, sort } = req.query;
    console.log("QUERY:", req.query);
    console.log("SORT:", sort);
    console.log("SEARCH:", search);
    const query = {};

    // if (categories) {
    //   query.category = {
    //     $in:  categories.split(","),
    //   };
    // }
    if (categories) {
      query.category = {
        $in: categories.split(",").map((id) => new mongoose.Types.ObjectId(id)),
      };
    }

    if (search) {
      query.title = {
        $regex: search,
        $options: "i",
      };
    }
    if (authors) {
      query.author = {
        $in: authors.split(","),
      };
    }

    if (minPrice || maxPrice) {
      query.price = {};

      if (minPrice) {
        query.price.$gte = Number(minPrice);
      }

      if (maxPrice) {
        query.price.$lte = Number(maxPrice);
      }
    }
    console.log("Query-----------", query);
    let sortOption = {};

    if (sort === "price_asc") sortOption.price = 1;
    if (sort === "price_desc") sortOption.price = -1;
    if (sort === "newest") sortOption.createdAt = -1;
    if (sort === "bestselling") sortOption.sold = -1;

    const books = await BooksModel.find(query)
      .populate("category", "name")
      .sort(sortOption);
    res.status(200).json({
      success: true,
      count: books.length,
      books,
    });
  } catch (err) {
    console.log("Error", err.message);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const fetchBookByCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;

    const books = await BooksModel.find({ category: categoryId });
    return res
      .status(200)
      .json({ message: "Fetch all books successfully", books: books });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const fetchBookBySold = async (req, res) => {
  try {
    // const categoryId = req.params.id;

    const books = await BooksModel.find().sort({ sold: -1 }).limit(10);
    return res
      .status(200)
      .json({ message: "Fetch all books successfully", books: books });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
export const fetchBookByNew = async (req, res) => {
  try {
    // const categoryId = req.params.id;

    const books = await BooksModel.find().sort({ createdAt: -1 }).limit(10);
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
    let coverImageUrl = "";
    if (req.file) {
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "booK_cover" },
          (error, result) => {
            if (error) return reject(error);
            resolve(result);
          },
        );
        stream.end(req.file.buffer);
      });
      coverImageUrl = cloudinaryResult.secure_url;
    }
    const updatedBookDetails = { ...updatedBook, image: coverImageUrl };

    const book = await BooksModel.findByIdAndUpdate(
      BookId,
      updatedBookDetails,
      {
        returnDocument: "after",
      },
    );
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

export const getUniqueAuthors = async (req, res) => {
  try {
    const authors = await BooksModel.distinct("author");
    console.log(authors);
    return res.status(201).json({
      message: "fetch all authors successfully",
      authors: authors,
    });
  } catch (error) {
    console.error("Error fetching authors:", error);
    return res.status(500).json({ Error: error.message });
  }
};
