import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Chemin des fichiers JSON
const productsFilePath = path.join(__dirname, 'products.json');
const ordersFilePath = path.join(__dirname, 'orders.json');

// 1. GET /api/products : Récupérer tous les produits
app.get('/api/products', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur lors de la lecture des produits" });
    }
    res.json(JSON.parse(data));
  });
});

// 2. GET /api/products/:id : Récupérer un produit par son ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
    const products = JSON.parse(data);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({ error: "Produit non trouvé" });
    }
    res.json(product);
  });
});

// 3. POST /api/orders : Enregistrer une nouvelle commande
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      // Si le fichier n'existe pas, créer un tableau vide
      const orders = [];
      const orderId = Date.now();
      const orderWithId = {
        orderId,
        status: "created",
        ...newOrder
      };
      orders.push(orderWithId);
      
      fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
        if (err) {
          return res.status(500).json({ error: "Erreur lors de l'enregistrement de la commande" });
        }
        res.status(201).json({ orderId: orderId, status: "created" });
      });
      return;
    }
    
    if (err) {
      return res.status(500).json({ error: "Erreur serveur lors de la lecture des commandes" });
    }
    
    const orders = JSON.parse(data);
    const orderId = Date.now();
    
    const orderWithId = {
      orderId,
      status: "created",
      ...newOrder
    };

    orders.push(orderWithId);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (err) => {
      if (err) {
        return res.status(500).json({ error: "Erreur lors de l'enregistrement de la commande" });
      }
      res.status(201).json({ orderId: orderId, status: "created" });
    });
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});