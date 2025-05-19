// backend/controllers/authController.js

const jwt = require("jsonwebtoken");

// Simule une base de données temporaire pour les tests
const users = [];

exports.register = (req, res) => {
  const { email, password } = req.body;
  const userExists = users.find(user => user.email === email);
  if (userExists) return res.status(400).json({ message: "Utilisateur déjà inscrit" });

  const user = { email, password }; // À remplacer par du hash + DB en prod
  users.push(user);
  res.status(201).json({ message: "Utilisateur créé avec succès" });
};

exports.login = (req, res) => {
  const { email, password } = req.body;
  const user = users.find(user => user.email === email && user.password === password);
  if (!user) return res.status(401).json({ message: "Email ou mot de passe invalide" });

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });
  res.json({ token });
};
