const express = require("express");
const router = express.Router();

const {
  getProduits,
  ajouterProduit,
  modifierProduit,
  supprimerProduit
} = require("../controllers/produitController");

const { verifierToken, verifierAdmin } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/", getProduits);
router.post("/", verifierToken, verifierAdmin, ajouterProduit);
router.put(
   "/:id",
   verifierToken,
   verifierAdmin,
  // Parser les deux catégories de fichiers
  upload.fields([
    { name: "imageCouverture", maxCount: 1 },
    { name: "image",          maxCount: 10 }
  ]),
  modifierProduit
 );
router.delete("/:id", verifierToken, verifierAdmin, supprimerProduit);
router.get("/secret", verifierToken, (req, res) => {
  res.json({ message: "Accès autorisé", user: req.utilisateur });
});

module.exports = router;
