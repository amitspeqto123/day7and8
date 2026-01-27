// create category

import { createCategoryService, getAllCategoryService } from "../service/categoryService.js";

export const createCategory = async (req, res) => {
  try {
    const category = await createCategoryService(req.body);
    res.status(201).json({
      success: true,
      message: "Category created successfully",
      total: 1,
      category,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllCategory = async (req, res) => {
  try {
    const categories = await getAllCategoryService();
    res.status(200).json({
        success: true,
        message: "All category fetched..",
        total: categories.length,
        categories
    })
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
