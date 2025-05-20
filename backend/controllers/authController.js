const Utilisateur = require("../models/Utilisateur");
const bcrypt      = require("bcrypt");
const jwt         = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { email, motDePasse } = req.body;
  if (await Utilisateur.findOne({ email })) {
    return res.status(400).json({ message: "Email déjà utilisé" });
  }
  const hash = await bcrypt.hash(motDePasse, 10);
  const user = await new Utilisateur({ email, motDePasse: hash }).save();
  res.status(201).json({ message: "Utilisateur créé", id: user._id });
};

exports.login = async (req, res) => {
  const { email, motDePasse } = req.body;
  const user = await Utilisateur.findOne({ email });
  if (!user || !(await bcrypt.compare(motDePasse, user.motDePasse))) {
    return res.status(401).json({ message: "Email ou mot de passe invalide" });
  }
  const token = jwt.sign(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.json({ token });
};
