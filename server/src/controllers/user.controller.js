import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { comparePassword, hashPassword } from "../utils/hashpassword.utils.js";
import generateToken from "../utils/generateJwtToken.js";

export const signup = async (req, res) => {
  try {
    const { name, email, role, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(201).json({
      user: newUser,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        error: "User not found!",
      });
    }

    const passwordMatch = await comparePassword(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        error: "Authentication failed",
      });
    }

    const token = await generateToken(user);

    return res.status(200).json({ token });
  } catch (err) {
    console.error("Login error:", err);

    return res.status(500).json({
      error: err.message || "Login failed",
    });
  }
};
