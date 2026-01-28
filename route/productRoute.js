import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProuct,
  getProductById,
  getProductsByPriceRange,
  getProductsSortedByPrice,
  getProductStats,
  getProductWithCategory,
  getProductWithCategoryByBrand,
  updateProduct,
} from "../controller/productController.js";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin
router.post("/admin/create", isAuthenticated, isAdmin, createProduct);
router.delete("/admin/delete/:id", isAuthenticated, isAdmin, deleteProduct);
router.put("/admin/update/:id", isAuthenticated, isAdmin, updateProduct);

// user + admin
router.get("/", isAuthenticated, getAllProuct);
// Aggregation / Lookup routes
router.get("/with-category", isAuthenticated, getProductWithCategory);
router.get("/brand", isAuthenticated, getProductWithCategoryByBrand)
router.get("/sort", isAuthenticated, getProductsSortedByPrice);
router.get("/price-range", isAuthenticated, getProductsByPriceRange);
router.get("/stats", isAuthenticated, getProductStats);


router.get("/:id", isAuthenticated, getProductById);


export default router;
