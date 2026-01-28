
import express from "express";
import { getOrderById, orderCreate, totalOrder } from "../controller/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

// admin + User
router.post("/create", isAuthenticated, orderCreate);
router.get("/all", isAuthenticated, totalOrder);
router.get("/:id", isAuthenticated, getOrderById);


export default router;

