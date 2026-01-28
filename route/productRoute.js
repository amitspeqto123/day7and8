import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProuct,
  getProductById,
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
//router.get("/", isAuthenticated, getAllProuct); // for filter
router.get("/:id", isAuthenticated, getProductById);

export default router;
