import booksModel from "../models/books.model.js";
import cartsModel from "../models/carts.model.js";

export const addToCart = async (req, res) => {
  try {
    const BookId = req.params.id;
    const quantityRequested = req.body.stock;
    const currentUserId = req.user.userId;

    if (!BookId) {
      return res.status(400).json({ error: "Book Id is not provided" });
    }
    const isBookExist = await booksModel.findById(BookId);
    console.log("Book", isBookExist);

    if (!isBookExist) {
      return res.status(400).json({ error: "This book is does not exist" });
    }
    // const { stock } = isBookExist;
    // console.log("stock", stock);
    if (isBookExist.stock <= 0 || quantityRequested > isBookExist.stock) {
      return res.status(400).json({
        error:
          isBookExist.stock <= 0
            ? "Out Of Stock"
            : `Only ${isBookExist.stock} copies available`,
      });
    }
    console.log("Stock needed", quantityRequested);

    let cart = await cartsModel.findOneAndUpdate(
      { userId: currentUserId, "items.bookId": BookId },
      { $inc: { "items.$.quantity": quantityRequested } },
      { new: true }
    );

    if (!cart) {
      cart = await cartsModel.findOneAndUpdate(
        { userId: currentUserId },
        { $push: { items: { bookId: BookId, quantity: quantityRequested } } },
        { 
          new: true, 
          upsert: true 
        }
      );
    }


    return res.status(201).json({
      message: "successfully",
      //   Category: deletedCategory,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
