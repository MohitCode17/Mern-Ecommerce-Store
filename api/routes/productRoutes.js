import express from "express";
import formidable from "express-formidable";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  addProduct,
  addProductReview,
  deleteProduct,
  fetchAllProducts,
  fetchProductById,
  fetchProducts,
  fetchTopProducts,
  updateProduct,
} from "../controllers/productController.js";

import { checkId } from "../middlewares/checkId.js";

const router = express.Router();

// @desc    Fetch Products if any search keyword or using pagination
// method   GET
// url      /api/products
router.get("/", fetchProducts);

// @desc    Fetch top rated Products
// method   GET
// url      /api/products/top-product
router.get("/top-product", fetchTopProducts);

// @desc    Fetch all Products
// method   GET
// url      /api/products/all-product
router.get("/all-product", fetchAllProducts);

// @desc    Fetch product by id
// method   GET
// url      /api/products/:id
router.get("/:id", fetchProductById);

// @desc    Create new product
// method   POST
// url      /api/products
router.post("/", authenticateUser, authorizeAdmin, formidable(), addProduct);

// @desc    Update existing product
// method   PUT
// url      /api/products/:id
router.put(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  formidable(),
  updateProduct
);

// @desc    Delete product
// method   DELETE
// url      /api/products/:id
router.delete("/:id", authenticateUser, authorizeAdmin, deleteProduct);

// @desc    Add product review
// method   POST
// url      /api/products/:id/reviews
router.post("/:id/reviews", authenticateUser, checkId, addProductReview);

export default router;
