import express from "express";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

// Créer un produit
router.post("/", createProduct);

// Lister tous les produits (option filtre par catégorie ou sous-catégorie via slug)
router.get("/", getProducts);

// Obtenir un produit par ID
router.get("/:id", getProductById);

// Modifier un produit
router.patch("/:id", updateProduct);

// Supprimer un produit
router.delete("/:id", deleteProduct);

export default router;
