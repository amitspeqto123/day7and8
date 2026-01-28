import express from "express"
import { createCategory, getAllCategory } from "../controller/categoryController.js";
import { isAdmin, isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

// admin
router.post("/admin/create", isAuthenticated, isAdmin, createCategory);
// admin + User
router.get("/all", isAuthenticated,  getAllCategory);

export default router;