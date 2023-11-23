import express from "express";
const router = express.Router();
import {
  getCurrentUserProfile,
  updateCurrentUserProfile,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
} from "../controllers/userController.js";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";

// ========================== User Routes ===========================

// @desc    Get logged in user profile
// method   GET
// url      /api/users/profile

// @desc    Update logged in user profile
// method   PUT
// url      /api/users/profile
router
  .route("/profile")
  .get(authenticateUser, getCurrentUserProfile)
  .put(authenticateUser, updateCurrentUserProfile);

// ========================== Admin Routes ===========================

// @desc    Get all users list
// method   GET
// url      /api/users
router.get("/", authenticateUser, authorizeAdmin, getAllUsers);

// @desc    Get user by id
// method   GET
// url      /api/users/:id
router.get("/:id", authenticateUser, authorizeAdmin, getUserById);

// @desc    Update user by id
// method   PUT
// url      /api/users/:id
router.put("/:id", authenticateUser, authorizeAdmin, updateUserById);

// @desc    Delete user by id
// method   DELETE
// url      /api/users/:id
router.delete("/:id", authenticateUser, authorizeAdmin, deleteUserById);

export default router;
