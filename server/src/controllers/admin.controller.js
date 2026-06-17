import booksModel from "../models/books.model.js";
import userModel from "../models/user.model.js";
import ordersModel from "../models/orders.model.js";

export const fetchAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    return res.status(201).json({
      message: "Fetch  users successfully",
      Users: users,
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Error: err.message });
  }
};
export const blockUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const blockedUser = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked: true },
      { new: true },
    );

    if (!blockedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User blocked successfully",
      user: blockedUser,
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const unBlockUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const unBlockedUser = await userModel.findByIdAndUpdate(
      userId,
      { isBlocked: false },
      { new: true },
    );

    if (!unBlockedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User unblocked successfully",
      user: unBlockedUser,
    });
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({
      message: err.message,
    });
  }
};

export const getDashboardStats = async (req, res) => {
  try {
    const revenue = await ordersModel.aggregate([
      {
        $match: {
          status: "Delivered",
        },
      },
      {
        $group: {
          _id: null,
          totalRevenue: {
            $sum: "$totalPrice",
          },
        },
      },
    ]);
    const recentOrder = await ordersModel
      .find()
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(10);
    const totalBooks = await booksModel.countDocuments({});
    const totalOrders = await ordersModel.countDocuments({});
    const totalUsers = await userModel.countDocuments({});

    res.status(200).json({
      totalRevenue: revenue[0]?.totalRevenue || 0,
      totalBooks: totalBooks,
      totalUsers: totalUsers,
      totalOrders: totalOrders,
      recentOrder: recentOrder,
    });
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
};

export const fetchAllOrders = async (req, res) => {
  try {
    const orders = await ordersModel.find().populate("userId", "name email");
    res.status(200).json({
      orders: orders,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ Error: err.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    console.log("Id?>>>", id);
    console.log("Id?>>>", status);
    const updateOrder = await ordersModel.findByIdAndUpdate(
      id,
      { status: status },
      { new: true },
    );
  } catch (err) {
    console.log("Error", err.message);
    res.status(500).json({ Error: err.message });
  }
};

export const getAdminOrderById = async (req, res) => {
  try {
    const order = await ordersModel
      .findById(req.params.id)
      .populate("userId", "name email");

    if (!order) {
      return res.status(404).json({
        error: "Order not found",
      });
    }

    res.status(200).json({
      order: order,
    });
  } catch (err) {
    console.log("Error", err.message);
    return res.status(500).json({ Error: err.message });
  }
};

// server/src/controllers/admin.controller.js

export const getAdminProfile = async (req, res) => {
  try {
    const admin = await User.findById(req.user.userId).select("-password");
    if (!admin) return res.status(404).json({ error: "Admin not found" });

    res.status(200).json({ admin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
