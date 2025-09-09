import Category from "../models/Category.js";
import slugify from "slugify";

// Créer une catégorie ou sous-catégorie
export const createCategory = async (req, res) => {
  try {
    const { name, parent } = req.body; // parent optionnel
    const category = new Category({
      name,
      parent: parent || null,
      slug: slugify(name, { lower: true, strict: true }),
    });
    await category.save();
    res.status(201).json({ message: "Catégorie créée", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Lister toutes les catégories principales avec leurs sous-catégories
export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({ parent: null }); // catégories principales
    const result = [];

    for (const cat of categories) {
      const subCategories = await Category.find({ parent: cat._id });
      result.push({ ...cat.toObject(), subCategories });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Modifier une catégorie ou sous-catégorie
export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, parent } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      {
        name,
        parent: parent || null,
        slug: slugify(name, { lower: true, strict: true }),
      },
      { new: true }
    );
    res.json({ message: "Catégorie mise à jour", category });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Supprimer une catégorie ou sous-catégorie
export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    // Supprimer d'abord les sous-catégories si existantes
    await Category.deleteMany({ parent: id });
    await Category.findByIdAndDelete(id);

    res.json({ message: "Catégorie et ses sous-catégories supprimées" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
