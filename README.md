# 🍽️ RestoPremium – Le Premium
> **Application web de commande sur table – Haute Gastronomie Afro-Gourmet & Sahélienne**

Ce projet répond au sujet :  
**« Conception d’une interface Frontend réactive en composants »**  
*Focus technique : Architecture par composants avec Vue.js 3 et gestion d’état centralisée avec Pinia.*

---

## 🎯 Présentation du Projet

**RestoPremium** est une application web moderne, responsive et organisée en composants réutilisables, connectée à une API REST backend légère.  
Elle permet aux clients d'un restaurant gastronomique de passer commande directement depuis leur table (sélection de plats, gestion de panier, saisie du nom et numéro de table, transmission en cuisine) et offre à l'équipe en cuisine un écran de suivi en direct (KDS).

---

## 📦 Matrice des Livrables du Projet

| Livrable Demandé | Réalisation dans le Projet | Emplacement / Fichiers |
| :--- | :--- | :--- |
| **1. Maquettes** | Maquettes graphiques UI pour chaque écran | [Dossier `Ressources/`](./Ressources/) (`1.Accueil.png`, `2.Menu.png`, etc.) |
| **2. Composants** | 6 composants Vue réutilisables | `src/components/` (`Navbar.vue`, `Footer.vue`, `ProductCard.vue`, `CategoryFilter.vue`, `CartItem.vue`, `PromoBanner.vue`) |
| **3. Pages principales** | 5 vues clientes + 2 vues cuisine | `src/views/client/` (`Home.vue`, `Menu.vue`, `ProductDetails.vue`, `Cart.vue`, `OrderConfirmation.vue`) et `src/views/kitchen/` |
| **4. Gestion d’état** | 3 stores Pinia réactifs et centralisés | `src/stores/` (`menuStore.js`, `cartStore.js`, `orderStore.js`) |
| **5. Appels API** | Service HTTP centralisé & API Express | `src/services/api.js` et `api/server.js` (`/api/products`, `/api/orders`, `/api/history`) |
| **6. Guide utilisateur** | Manuel d'utilisation détaillé (client & cuisine) | [GUIDE_UTILISATEUR.md](./GUIDE_UTILISATEUR.md) et [DOCUMENTATION_TECHNIQUE.md](./DOCUMENTATION_TECHNIQUE.md) |

---

## 🛠️ Stack Technique

* **Frontend :** Vue.js 3 (`<script setup>`), Pinia, Vue Router 4, Vite 8
* **Backend :** Node.js, Express, Persistance JSON (`products.json`, `orders.json`, `history.json`)
* **Styling :** CSS natif modulaire avec variables de thème sombre & or

---

## 🚀 Démarrage Rapide

### 1. Installation des dépendances
```bash
npm install
```

### 2. Démarrer le serveur Backend (Port 3000)
```bash
node api/server.js
# ou npm run server
```

### 3. Démarrer le client Frontend (Port 5173)
```bash
npm run dev
```

* **Application Client :** http://localhost:5173/
* **Écran Cuisine :** http://localhost:5173/kitchen
* **Historique des commandes :** http://localhost:5173/kitchen/history
