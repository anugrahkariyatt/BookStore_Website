import userModel from "../models/user.model.js";

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
