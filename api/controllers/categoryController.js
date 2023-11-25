import Category from "../models/categoryModel.js";
import { errorHandler } from "../utils/error.js";

export const createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;

    // Validation
    if (!name) return next(errorHandler(400, "Category name is required"));

    const isCategoryExist = await Category.findOne({ name });

    if (isCategoryExist)
      return next(errorHandler(400, "Category name is already exists"));

    const newCategory = new Category({ name });
    await newCategory.save();

    res.status(201).json(newCategory);
  } catch (error) {
    next(error);
  }
};

export const fetchAllCategory = async (req, res, next) => {
  try {
    const allCategories = await Category.find({});
    res.status(200).json(allCategories);
  } catch (error) {
    next(error);
  }
};

export const fetchCategoryById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return next(errorHandler(404, "Category not found !"));

    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) return next(errorHandler(404, "Category not found !"));

    // Update category if category found
    category.name = req.body.name;

    const updatedCategory = await category.save();

    res.status(200).json(updatedCategory);
  } catch (error) {
    next(error);
  }
};

export const removeCategory = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) return next(errorHandler(404, "Category not found !"));

    res.status(200).json({ message: "Cateogory removed successfully" });
  } catch (error) {
    next(error);
  }
};
