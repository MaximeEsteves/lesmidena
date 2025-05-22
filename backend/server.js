// backend/server.js
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/produits", require("./routes/produits"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));



mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur MongoDB :", err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur backend lancé sur le port ${PORT}`));
