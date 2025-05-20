// backend/createAdmin.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt   = require("bcrypt");
const Utilisateur = require("./models/Utilisateur");

async function main() {
  // 1) Connexion à MongoDB
  await mongoose.connect(process.env.MONGO_URI);
  console.log("🔗 Connecté à MongoDB");

  // 2) Paramètres de l'admin (à changer ici ou via .env)
  const email    = process.env.ADMIN_EMAIL    || "admin@monsite.com";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";

  // 3) Vérifier qu'il n'existe pas déjà
  let admin = await Utilisateur.findOne({ email });
  if (admin) {
    console.log(`⚠️  L'admin ${email} existe déjà (id=${admin._id})`);
    process.exit(0);
  }

  // 4) Hasher le mot de passe
  const hash = await bcrypt.hash(password, 10);

  // 5) Créer l'utilisateur admin
  admin = new Utilisateur({ email, motDePasse: hash, isAdmin: true });
  await admin.save();

  console.log("✅ Admin créé :", {
    id: admin._id.toString(),
    email: admin.email,
    isAdmin: admin.isAdmin
  });
  process.exit(0);
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
