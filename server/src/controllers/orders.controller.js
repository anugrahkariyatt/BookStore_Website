import booksModel from "../models/books.model.js";
import cartsModel from "../models/carts.model.js";
import ordersModel from "../models/orders.model.js";

export const createOrder = async (req, res) => {
  try {
    const cartId = req.params.id;
    const currentUserId = req.user.userId;

    const { shippingAddress, paymentMethod } = req.body;

    if (!cartId) {
      return res.status(400).json({
        error: "Cart ID is required",
      });
    }

    if (!shippingAddress) {
      return res.status(400).json({
        error: "Shipping address is required",
      });
    }

    const cart = await cartsModel
      .findOne({
        _id: cartId,
        userId: currentUserId,
      })
      .populate("items.bookId");

    if (!cart) {
      return res.status(404).json({
        error: "Cart not found",
      });
    }

    if (!cart.items.length) {
      return res.status(400).json({
        error: "Cart is empty",
      });
    }

    // Validate stock
    for (const item of cart.items) {
      const book = await booksModel.findById(item.bookId._id);

      if (!book) {
        return res.status(404).json({
          error: `Book not found`,
        });
      }

      if (book.stock < item.quantity) {
        return res.status(400).json({
          error: `${book.title} has only ${book.stock} copies available`,
        });
      }
    }

    // Reduce stock
    for (const item of cart.items) {
      await booksModel.findByIdAndUpdate(item.bookId._id, {
        $inc: {
          stock: -item.quantity,
          sold: item.quantity,
        },
      });
    }

    const totalPrice = cart.items.reduce(
      (sum, item) => sum + item.bookId.price * item.quantity,
      0,
    );

    const orderItems = cart.items.map((item) => ({
      bookId: item.bookId._id,
      title: item.bookId.title,
      image: item.bookId.image,
      quantity: item.quantity,
      price: item.bookId.price,
    }));

    const order = await ordersModel.create({
      userId: currentUserId,

      shippingAddress,

      paymentMethod: paymentMethod || "COD",

      items: orderItems,

      totalPrice,

      status: "Pending",
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    return res.status(201).json({
      message: "Order created successfully",
      order,
    });
  } catch (err) {
    console.log("Error:", err);

    return res.status(500).json({
      error: err.message,
    });
  }
};

export const fetchMyOrders = async (req, res) => {
  try {
    const orders = await ordersModel
      .find({ userId: req.user.userId })
      .populate("items.bookId", "title price image")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      orders,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const cancelOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    const currentUserId = req.user.userId;

    const order = await ordersModel.findOne({
      _id: orderId,
      userId: currentUserId,
    });

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    if (order.status !== "Pending") {
      return res.status(400).json({
        error: "Only pending orders can be cancelled",
      });
    }

    for (const item of order.items) {
      await booksModel.findByIdAndUpdate(item.bookId, {
        $inc: {
          stock: item.quantity,
          sold: -item.quantity,
        },
      });
    }

    order.status = "Cancelled";
    await order.save();

    return res.status(200).json({
      message: "Order cancelled successfully",
      order,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await ordersModel.findOne({
      _id: req.params.id,
      userId: req.user.userId,
    });

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.status(200).json({
      order,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};
