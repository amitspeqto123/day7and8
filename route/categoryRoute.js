import express from "express"
import { createCategory, getAllCategory } from "../controller/categoryController.js";

const router = express.Router();

router.post("/create", createCategory);
router.get("/all", getAllCategory);

export default router;