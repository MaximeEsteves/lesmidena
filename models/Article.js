const mongoose = require('mongoose');

const SousArticleSchema = new mongoose.Schema({
  nom: String,
  couleur: String,
  description: String,
  prix: Number,
  imageUrl: String
});

const ArticleSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  sousArticles: [SousArticleSchema]
});

module.exports = mongoose.model('Article', ArticleSchema);
