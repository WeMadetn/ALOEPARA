import Order from "../models/Order.js";

// Créer une commande depuis le formulaire
export const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Commande enregistrée", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lister toutes les commandes (admin)
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("products.product");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir une commande par id
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.product"
    );
    if (!order)
      return res.status(404).json({ message: "Commande non trouvée" });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier le statut d'une commande
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    res.json({ message: "Statut de commande mis à jour", order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
