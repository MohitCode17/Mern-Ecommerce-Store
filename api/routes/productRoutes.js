import express from "express";
import formidable from "express-formidable";
import {
  authenticateUser,
  authorizeAdmin,
} from "../middlewares/authMiddleware.js";
import {
  createProduct,
  removeProduct,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

// @desc    Create new product
// method   POST
// url      /api/product
router.post("/", authenticateUser, authorizeAdmin, formidable(), createProduct);

// @desc    Update product
// method   PUT
// url      /api/product/:id
router.post(
  "/:id",
  authenticateUser,
  authorizeAdmin,
  formidable(),
  updateProduct
);

// @desc    Remove product
// method   PUT
// url      /api/product/:id
router.post("/:id", authenticateUser, authorizeAdmin, removeProduct);

export default router;
