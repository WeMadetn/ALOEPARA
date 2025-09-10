import express from "express";
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} from "../controllers/category.controller.js";

const router = express.Router();

// Créer une catégorie ou sous-catégorie
router.post("/", createCategory);

// Lister toutes les catégories principales avec sous-catégories
router.get("/", getCategories);

// Modifier une catégorie ou sous-catégorie
router.put("/:id", updateCategory);

// Supprimer une catégorie et ses sous-catégories
router.delete("/:id", deleteCategory);

export default router;
