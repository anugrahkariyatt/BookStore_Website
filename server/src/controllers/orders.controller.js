import booksModel from "../models/books.model.js";
import cartsModel from "../models/carts.model.js";
import ordersModel from "../models/orders.model.js";

export const createOrder = async (req, res) => {
  try {
    const cartId = req.params.id;
    // const currentUserId = req.user.userId;
    // console.log(">>>",currentUserId);

    if (!cartId) {
      return res.status(400).json({ error: "cartId is not provided" });
    }

    const cart = await cartsModel.findById(cartId);
    // Verify cart exists before checking items

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }
    for (const item of cart.items) {
      const book = await booksModel.findById(item.bookId);
      if (!book) {
        return res
          .status(404)
          .json({ error: `Book with ID ${item.bookId} no longer exists` });
      }
      if (book.stock <= 0 || item.quantity > book.stock) {
        return res.status(400).json({
          error:
            book.stock <= 0
              ? "One or more items are Out Of Stock"
              : `Not enough stock! Only ${book.stock} copies available.`,
        });
      }
    }

    return res.status(201).json({
      message: "All items verified. Order processed successfully.",
      cart: cart,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};

export const fetchOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find({});
     return res.status(201).json({
      message: "Fetch all orders .",
      Orders: orders,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ error: err.message });
  }
};
