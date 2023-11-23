import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/authController.js";

// ========================== Auth Routes(Register, Login, Logout) ===========================

// @desc    New user registration route
// method   POST
// url      /api/auth/register
router.post("/register", registerUser);

// @desc    User sign-in route
// method   POST
// url      /api/auth/login
router.post("/login", loginUser);

// @desc    Logout user route
// method   POST
// url      /api/auth/logout
router.post("/logout", logoutUser);

export default router;
