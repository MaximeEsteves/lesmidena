// 🌍 Chargement des variables d'environnement
require('dotenv').config(); // Charger les variables d'environnement
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors()); // Autorise toutes les requêtes cross-origin
app.use(express.json()); // Parse le JSON des requêtes

// Import des routes articles
const articleRoutes = require('./routes/articles');

// Routes
app.use('/api/articles', articleRoutes);

// Route test racine
app.get('/', (req, res) => {
  res.send('API en ligne 🚀');
});

// Connexion à MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Connecté à MongoDB');
    // Démarrage du serveur seulement si la DB est connectée
    app.listen(process.env.PORT || 3000, () => {
      console.log(`🌐 Serveur démarré sur http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.error('❌ Erreur MongoDB :', err);
  });
