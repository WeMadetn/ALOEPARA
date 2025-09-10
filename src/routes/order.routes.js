import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
} from "../controllers/order.controller.js";

const router = express.Router();

// Créer une commande depuis le formulaire
router.post("/", createOrder);

// Lister toutes les commandes (admin)
router.get("/", getOrders);

// Obtenir une commande par ID
router.get("/:id", getOrderById);

// Modifier le statut d'une commande
router.put("/:id", updateOrderStatus);

export default router;
