import express from "express";
import categoryController from "../controllers/categoryController.js";
import e from "express";

const router = express.Router();

router.route("/")
.get(categoryController.getCategories)
.post(categoryController.createCategory);

router.route("/:id")
.put(categoryController.updateCategory)
.delete(categoryController.deleteCategory);

export default router;