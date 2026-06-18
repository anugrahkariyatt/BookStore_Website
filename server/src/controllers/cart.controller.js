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
      { new: true },
    );

    if (!cart) {
      cart = await cartsModel.findOneAndUpdate(
        { userId: currentUserId },
        { $push: { items: { bookId: BookId, quantity: quantityRequested } } },
        {
          new: true,
          upsert: true,
        },
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

export const fetchAllItemsByUserId = async (req, res) => {
  try {
    const currentUserId = req.user.userId;
    
    const cartItems = await cartsModel
      .findOne({
        userId: currentUserId,
      })
      .populate("items.bookId");
    // console.log(">>>>", cartItems);
    if (!cartItems) {
      return res.status(200).json({
        message: "successfully fetch all cart items",
        Cart: { userId: currentUserId, items: [] } 
      });
    }

    return res.status(201).json({
      message: "successfully fetch all cart items",
      Cart: cartItems,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const currentUserId = req.user.userId;
    const nextQuantity = Number(req.body.quantity);

    if (!cartItemId) {
      return res.status(400).json({ error: "Cart item Id is not provided" });
    }

    if (!Number.isInteger(nextQuantity) || nextQuantity < 1) {
      return res.status(400).json({
        error: "Quantity must be a whole number greater than 0",
      });
    }

    const cart = await cartsModel
      .findOne({ userId: currentUserId })
      .populate("items.bookId");

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const cartItem = cart.items.id(cartItemId);

    if (!cartItem) {
      return res.status(404).json({ error: "Cart item not found" });
    }

    if (cartItem.bookId.stock < nextQuantity) {
      return res.status(400).json({
        error: `Only ${cartItem.bookId.stock} copies available`,
      });
    }

    cartItem.quantity = nextQuantity;
    await cart.save();

    const updatedCart = await cartsModel
      .findOne({ userId: currentUserId })
      .populate("items.bookId");

    return res.status(200).json({
      message: "Quantity updated successfully",
      Cart: updatedCart,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ Error: err.message });
  }
};

export const deletedOneItem = async (req, res) => {
  try {
    const bookId = req.params.id;
    console.log(bookId, "------------->>");

    const currentUserId = req.user.userId;
    if (!bookId) {
      return res.status(400).json({ error: "Book Id is not provided" });
    }
    const deletedCart = await cartsModel.findOneAndUpdate(
      { userId: currentUserId },
      {
        $pull: {
          items: { _id: bookId },
        },
      },
      { new: true },
    );
    const cartItems = await cartsModel
      .findOne({
        userId: currentUserId,
      })
      .populate("items.bookId");
    return res.status(201).json({
      message: "successfully delete one ",
      Cart: cartItems,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ Error: err.message });
  }
};
