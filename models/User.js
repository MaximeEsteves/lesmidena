const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // stocke le hash du mdp
});

// méthode pour vérifier le mot de passe
userSchema.methods.comparePassword = function(password) {
  return bcrypt.compare(password, this.password);
}

module.exports = mongoose.model('User', userSchema);
