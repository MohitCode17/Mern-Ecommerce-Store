import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

// ============================== User Controller =======================================
export const getCurrentUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      return res
        .status(200)
        .json({ _id: user._id, username: user.username, email: user.email });
    } else {
      next(errorHandler(404, "User not found !"));
    }
  } catch (error) {
    next(error);
  }
};

export const updateCurrentUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username || req.username;
      user.email = req.body.email || req.email;

      if (req.body.password) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      next(errorHandler(404, "User not found !"));
    }
  } catch (error) {
    next(error);
  }
};

// ============================== Admin Controller =======================================

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password");
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(errorHandler(404, "User not found !"));
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.username = req.body.username || user.username;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    } else {
      next(errorHandler(404, "User not found !"));
    }
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (user.isAdmin) {
      return next(errorHandler(400, "You cannot delete Admin !"));
    }

    await User.deleteOne({ _id: user._id });

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
