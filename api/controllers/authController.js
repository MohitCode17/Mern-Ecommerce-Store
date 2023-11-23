import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";

// Register user controller
export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    // validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "Please provides all fields" });
    }

    // check if user already exists
    const isUserExist = await User.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      email,
      password: hashedPassword,
    });

    await user.save();

    // Generate JWT Token
    generateToken(res, user._id);

    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// Login user controller
export const loginUser = () => {};

// logout user controller
export const logoutUser = () => {};
