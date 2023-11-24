import express from "express";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createCategory,
  fetchAllCategory,
  fetchCategoryById,
  removeCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();

// @desc    Create new category routes
// method   POST
// url      /api/category
router.post("/", authenticateUser, authorizeAdmin, createCategory);

// @desc    Fetch all categories routes
// method   GET
// url      /api/category
router.get("/", fetchAllCategory);

// @desc    Fetch category by id routes
// method   GET
// url      /api/category/:id
router.get("/:id", fetchCategoryById);

// @desc    Update category routes
// method   PUT
// url      /api/category/:id
router.put("/:id", authenticateUser, authorizeAdmin, updateCategory);

// @desc    Remove category routes
// method   DELETE
// url      /api/category/:id
router.put("/:id", authenticateUser, authorizeAdmin, removeCategory);

export default router;
