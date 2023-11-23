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
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // validation
    if (!email || !password) {
      return res.status(400).json({ message: "Please provides all fields" });
    }

    // check user is a registered user or not
    const validUser = await User.findOne({ email });

    if (!validUser) {
      return res.status(404).json({ message: "User not found !" });
    }

    // if validuser check password
    const isValidPassword = await bcrypt.compare(password, validUser.password);

    if (!isValidPassword) {
      return res.status(404).json({ message: "Invalid credentials!" });
    }

    // send token
    generateToken(res, validUser._id);

    res.status(200).json({
      _id: validUser._id,
      username: validUser.username,
      email: validUser.email,
      isAdmin: validUser.isAdmin,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

// logout user controller
export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(500).json(error.message);
  }
};
