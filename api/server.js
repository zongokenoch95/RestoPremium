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

const productsFilePath = path.join(__dirname, 'products.json');
const ordersFilePath = path.join(__dirname, 'orders.json');
const historyFilePath = path.join(__dirname, 'history.json');

// 1. GET /api/products : Récupérer tous les produits
app.get('/api/products', (req, res) => {
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      return res.json([]);
    }
    if (err) {
      return res.status(500).json({ error: "Erreur serveur lors de la lecture des produits" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.json([]);
    }
  });
});

// 2. GET /api/products/:id : Récupérer un produit par son ID
app.get('/api/products/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  fs.readFile(productsFilePath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Erreur serveur" });
    }
    try {
      const products = JSON.parse(data);
      const product = products.find(p => p.id === productId);
      
      if (!product) {
        return res.status(404).json({ error: "Produit non trouvé" });
      }
      res.json(product);
    } catch (parseErr) {
      res.status(500).json({ error: "Erreur de format JSON" });
    }
  });
});

// 3. GET /api/orders : Récupérer toutes les commandes (pour l'écran cuisine)
app.get('/api/orders', (req, res) => {
  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      return res.json([]);
    }
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture des commandes" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.json([]);
    }
  });
});

// 4. POST /api/orders : Enregistrer une nouvelle commande
// 3. POST /api/orders : Enregistrer une nouvelle commande
app.post('/api/orders', (req, res) => {
  const newOrder = req.body;

  fs.readFile(ordersFilePath, 'utf8', (err, data) => {
    let orders = [];
    
    if (!err) {
      try {
        orders = JSON.parse(data);
      } catch (parseErr) {
        orders = [];
      }
    }

    const orderId = Date.now();
    const orderWithId = {
      orderId,
      status: "created",
      ...newOrder
    };

    orders.push(orderWithId);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Erreur lors de l'enregistrement de la commande" });
      }
      res.status(201).json({ orderId: orderId, status: "created" });
    });
  });
});

// 5. POST /api/orders/:id/complete : Marquer une commande comme prête (la retire de orders.json et l'ajoute à history.json)
app.post('/api/orders/:id/complete', (req, res) => {
  const orderId = Number(req.params.id);

  fs.readFile(ordersFilePath, 'utf8', (err, ordersData) => {
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture des commandes" });
    }

    let orders = [];
    try {
      orders = JSON.parse(ordersData);
    } catch (e) {
      orders = [];
    }

    const orderIndex = orders.findIndex(o => (o.orderId === orderId || o.id === orderId));
    if (orderIndex === -1) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    const completedOrder = {
      ...orders[orderIndex],
      status: "effectue",
      completedAt: new Date().toISOString()
    };

    orders.splice(orderIndex, 1);

    fs.writeFile(ordersFilePath, JSON.stringify(orders, null, 2), (writeErr) => {
      if (writeErr) {
        return res.status(500).json({ error: "Erreur lors de la mise à jour des commandes" });
      }

      fs.readFile(historyFilePath, 'utf8', (histErr, histData) => {
        let history = [];
        if (!histErr) {
          try {
            history = JSON.parse(histData);
          } catch (e) {
            history = [];
          }
        }

        history.push(completedOrder);

        fs.writeFile(historyFilePath, JSON.stringify(history, null, 2), (histWriteErr) => {
          if (histWriteErr) {
            return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'historique" });
          }
          res.json({ success: true, order: completedOrder });
        });
      });
    });
  });
});

// 6. GET /api/history : Récupérer toutes les commandes traitées (historique)
app.get('/api/history', (req, res) => {
  fs.readFile(historyFilePath, 'utf8', (err, data) => {
    if (err && err.code === 'ENOENT') {
      return res.json([]);
    }
    if (err) {
      return res.status(500).json({ error: "Erreur lors de la lecture de l'historique" });
    }
    try {
      res.json(JSON.parse(data));
    } catch (parseErr) {
      res.json([]);
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Serveur backend démarré sur http://localhost:${PORT}`);
});