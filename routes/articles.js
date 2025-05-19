// routes/articles.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');

// ➕ Créer un nouvel article
router.post('/', async (req, res) => {
  try {
    const nouvelArticle = new Article(req.body);
    const sauvegarde = await nouvelArticle.save();
    res.status(201).json(sauvegarde);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Erreur lors de l’ajout de l’article' });
  }
});
// 🔍 Obtenir tous les articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération des articles" });
  }
});

module.exports = router;