// backend/controllers/produitController.js
const Product = require("../models/Product");

// 1. LISTE DES PRODUITS
exports.getProduits = async (req, res) => {
  try {
    const produits = await Product.find();
    res.json(produits);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération", error: err });
  }
};

// 2. AJOUTER UN PRODUIT (tu as déjà)
exports.ajouterProduit = async (req, res) => {
  try {
    const { categorie, imageCouverture, produits } = req.body;
    const nouveau = new Product({ categorie, imageCouverture, produits });
    await nouveau.save();
    res.status(201).json({ message: "Produit ajouté avec succès", produit: nouveau });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout", error });
  }
};

// 3. MODIFIER UN PRODUIT
exports.modifierProduit = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({ message: "Produit modifié", produit: updated });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la modification", error: err });
  }
};

// 4. SUPPRIMER UN PRODUIT
exports.supprimerProduit = async (req, res) => {
  try {
    const { id } = req.params;
    await Product.findByIdAndDelete(id);
    res.json({ message: "Produit supprimé" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la suppression", error: err });
  }
};
