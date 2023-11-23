import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { errorHandler } from "../utils/error.js";

export const authenticateUser = async (req, res, next) => {
  // Read token from HTTP-Only Cookies
  let token = req.cookies.jwt;

  // Validation
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      next(errorHandler(401, "Unauthorized, Token Expired"));
    }
  } else {
    next(errorHandler(401, "Unauthorized, JWT token not found"));
  }
};

// Admin Acess only middlware

export const authorizeAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next(errorHandler(401, "Not authorized as admin"));
  }
};
