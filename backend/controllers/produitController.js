const Product = require("../models/Product");

// ➕ Ajouter un produit
exports.ajouterProduit = async (req, res) => {
  try {
    const nouveauProduit = new Product(req.body);
    await nouveauProduit.save();
    res.status(201).json({ message: "Produit ajouté avec succès", produit: nouveauProduit });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de l'ajout", error });
  }
};

// 🔄 Modifier un produit
exports.modifierProduit = async (req, res) => {
  try {
    const produitModifie = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!produitModifie) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit modifié avec succès", produit: produitModifie });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la modification", error });
  }
};

// ❌ Supprimer un produit
exports.supprimerProduit = async (req, res) => {
  try {
    const produitSupprime = await Product.findByIdAndDelete(req.params.id);
    if (!produitSupprime) {
      return res.status(404).json({ message: "Produit non trouvé" });
    }
    res.json({ message: "Produit supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression", error });
  }
};

// 📄 Récupérer tous les produits
exports.getProduits = async (req, res) => {
  try {
    const produits = await Product.find();
    res.json(produits);
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération", error });
  }
};
