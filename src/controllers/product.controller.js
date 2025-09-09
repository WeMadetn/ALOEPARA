import Product from "../models/Product.js";
import Category from "../models/Category.js";

// Créer un produit
export const createProduct = async (req, res) => {
  try {
    const { name, description, price, stock, image, category } = req.body;
    const product = new Product({
      name,
      description,
      price,
      stock,
      image,
      category,
    });
    await product.save();
    res.status(201).json({ message: "Produit créé", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lister tous les produits (option filtre par catégorie ou sous-catégorie)
export const getProducts = async (req, res) => {
  try {
    const filter = {};

    if (req.query.category) {
      // Filtrer par catégorie principale ou sous-catégorie
      const category = await Category.findOne({ slug: req.query.category });
      if (category) {
        filter.category = category._id;
      }
    }

    const products = await Product.find(filter).populate("category");
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Obtenir un produit par ID
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");
    if (!product)
      return res.status(404).json({ message: "Produit non trouvé" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier un produit
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "Produit mis à jour", product });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer un produit
export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Produit supprimé" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
