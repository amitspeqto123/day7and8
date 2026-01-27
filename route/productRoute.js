import express from "express"
import { createProduct, deleteProduct, getAllProuct, getProductById, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.post("/create", createProduct);
router.get("/all", getAllProuct);
router.get("/:id", getProductById);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;