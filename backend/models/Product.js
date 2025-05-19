const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  categorie: { type: String, required: true },
  imageCouverture: { type: String, required: true },
  produits: [
    {
      id: { type: Number, required: true },
      nom: { type: String, required: true },
      image: [String],
      description: String,
      titreDescription: String,
      descriptionComplete: String,
      materiaux: String,
      prix: { type: Number, required: true },
      reference: String,
      stock: Number
    }
  ]
});

module.exports = mongoose.model("Product", productSchema);
