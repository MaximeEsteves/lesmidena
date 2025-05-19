require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    const email = 'test@example.com';
    const password = 'password123';
    const hash = await bcrypt.hash(password, 10);

    const user = new User({ email, password: hash });
    await user.save();

    console.log('Utilisateur créé !');
    process.exit();
  })
  .catch(err => console.error(err));
