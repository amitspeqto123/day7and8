
import express from "express";
import { orderCreate, totalOrder } from "../controller/orderController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/create", isAuthenticated, orderCreate);
router.get("/all", totalOrder);

export default router;

