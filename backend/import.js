// import.js
require('dotenv').config();
const { MongoClient } = require('mongodb');
const fs = require('fs');


async function importCollection() {
  const uri = process.env.MONGO_URI;
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db("boutique");
  const col = db.collection("products");

  // Optionnel : vider la collection avant
  await col.deleteMany({});

  const docs = JSON.parse(fs.readFileSync("produits.json", "utf-8"));
  await col.insertMany(docs);
  console.log("Import terminé depuis produits.json");
  await client.close();
}

importCollection().catch(console.error);
