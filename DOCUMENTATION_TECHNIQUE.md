# 📘 Documentation Technique – Stabilisation & Architecture du Socle Frontend / Backend

> **Destinataire :** Membre 6 (Lead Tech / Architecture) & Équipe de développement  
> **Projet :** Restaurant Client – *Le Premium* (Application de commande sur table)  
> **Version du socle :** v1.0.0 (Socle technique stabilisé)  
> **Date de mise à jour :** Septembre 2026  

---

## 📑 Table des Matières

1. [Contexte et Objectifs de la Stabilisation](#1-contexte-et-objectifs-de-la-stabilisation)
2. [Cartographie des Modifications & Fichiers Touchés](#2-cartographie-des-modifications--fichiers-touchés)
3. [Détail Technique des Modifications](#3-détail-technique-des-modifications)
   * [3.1. Configuration de l'environnement de build (`vite.config.js`)](#31-configuration-de-lenvironnement-de-build-viteconfigjs)
   * [3.2. Normalisation des scripts NPM (`package.json`)](#32-normalisation-des-scripts-npm-packagejson)
   * [3.3. Résolution des dépendances du Routeur (`src/views/client/`)](#33-résolution-des-dépendances-du-routeur-srcviewsclient)
   * [3.4. Système de Design Global & Reset CSS (`src/assets/styles/main.css`)](#34-système-de-design-global--reset-css-srcassetsstylesmaincss)
   * [3.5. Point d'entrée et Composant Racine (`main.js` & `App.vue`)](#35-point-dentrée-et-composant-racine-mainjs--appvue)
4. [Architecture & Flux de Données](#4-architecture--flux-de-données)
5. [Guide de Démarrage Rapide pour les Développeurs](#5-guide-de-démarrage-rapide-pour-les-développeurs)
6. [Matrice des Responsabilités & Prochaines Étapes](#6-matrice-des-responsabilités--prochaines-étapes)

---

## 1. Contexte et Objectifs de la Stabilisation

Lors de la phase initiale du projet, plusieurs éléments architecturaux (Stores Pinia, API Express backend, données JSON, routeur) avaient été posés. Cependant, le projet souffrait de plusieurs points de blocage qui empêchaient la compilation Vite et l'exécution fluide :

1. **Imports cassés** : L'utilisation de l'alias `@` dans le routeur et les stores provoquait une erreur fatale de compilation car Vite ne le reconnaissait pas.
2. **Vues manquantes** : Le routeur importait 4 vues qui n'existaient pas physiquement sur le disque, entraînant un crash immédiat du bundler.
3. **Absence de communication transparente avec le backend** : Les appels relatifs `/api/...` échouaient car aucun proxy inverse de développement n'était configuré entre le port `5173` (Vite) et le port `3000` (Express).
4. **Pollution visuelle du boilerplate** : Le template initial de Vite injectait des styles parasites (largeur fixe à 1126px, centrage forcé) qui entravaient l'intégration de la maquette responsive.

**Objectif atteint :** Mettre en place un socle technique 100% stable, compilable (`npm run build` validé avec exit code 0), propre et documenté pour permettre à l'équipe de développer les composants et vues sans friction.

---

## 2. Cartographie des Modifications & Fichiers Touchés

```
restaurant-client/
├── DOCUMENTATION_TECHNIQUE.md     ✨ [NOUVEAU] Documentation d'architecture complète
├── vite.config.js                 ✏️ [MODIFIÉ] Ajout alias '@' + Proxy dev '/api' vers :3000
├── package.json                   ✏️ [MODIFIÉ] Ajout du script "server": "node api/server.js"
├── src/
│   ├── main.js                    ✏️ [NETTOYÉ] Importation propre de main.css et montage Pinia/Router
│   ├── App.vue                    ✏️ [MODIFIÉ] Suppression HelloWorld, insertion <router-view />
│   ├── style.css                  ✏️ [NETTOYÉ] Remplacement du template Vite par le pont vers main.css
│   ├── assets/
│   │   └── styles/
│   │       └── main.css           ✨ [CRÉÉ] Charte graphique, variables CSS, reset et utilitaires
│   └── views/
│       └── client/
│           ├── Home.vue           (Existant)
│           ├── Menu.vue           ✨ [CRÉÉ] Stub pour la route /menu
│           ├── ProductDetails.vue ✨ [CRÉÉ] Stub pour la route /product/:id (avec props: true)
│           ├── Cart.vue           ✨ [CRÉÉ] Stub pour la route /cart
│           └── OrderConfirmation.vue ✨ [CRÉÉ] Stub pour la route /confirmation
```

---

## 3. Détail Technique des Modifications

### 3.1. Configuration de l'environnement de build (`vite.config.js`)

#### Problématique
* `src/router/index.js` et `src/stores/*.js` effectuaient des imports absolus de la forme `@/services/api` ou `@/views/client/Home.vue`.
* Sans alias, Vite lève l'exception `Failed to resolve import "@/..."`.
* Les appels `fetch('/api/products')` dans `src/services/api.js` étaient envoyés sur le port `5173` au lieu du serveur Express sur le port `3000`.

#### Solution implémentée
Configuration de `fileURLToPath` pour l'alias et d'un proxy inverse dans `vite.config.js` :

```javascript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      // Résout '@' vers le dossier absolu 'src'
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 5173,
    proxy: {
      // Redirige silencieusement les requêtes frontend vers le backend Express
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})
```

#### Avantages pour l'équipe
* Aucun souci de **CORS** en développement local.
* Inutile d'écrire en dur `http://localhost:3000` dans les fichiers `.vue` ou `.js`.
* Imports standardisés et robustes quelle que soit l'arborescence des sous-dossiers.

---

### 3.2. Normalisation des scripts NPM (`package.json`)

#### Solution implémentée
Ajout du script de démarrage de l'API backend dans `package.json` :

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "server": "node api/server.js"
}
```

* `npm run server` : Démarre l'API REST Express sur `http://localhost:3000`.
* `npm run dev` : Démarre le serveur de développement Vite sur `http://localhost:5173`.

---

### 3.3. Résolution des dépendances du Routeur (`src/views/client/`)

#### Problématique
Le fichier `src/router/index.js` définit 5 routes clientes indispensables au cahier des charges :
* `/` ➔ `Home.vue`
* `/menu` ➔ `Menu.vue`
* `/product/:id` ➔ `ProductDetails.vue`
* `/cart` ➔ `Cart.vue`
* `/confirmation` ➔ `OrderConfirmation.vue`

L'absence des 4 derniers fichiers bloquait la compilation du projet.

#### Solution implémentée
Création de composants Vue 3 monofichiers (SFC) avec `<script setup>` conformes aux spécifications attendues :

1. **`Menu.vue`** : Stub de la vue catalogue prêt à accueillir `CategoryFilter.vue` et la grille de `ProductCard.vue`.
2. **`ProductDetails.vue`** : Stub configuré avec la prop `id` (`defineProps({ id: String })`) pour recevoir le paramètre de route dynamique (`/product/:id`).
3. **`Cart.vue`** : Stub de gestion du panier prêt pour `CartItem.vue` et le formulaire nom + numéro de table.
4. **`OrderConfirmation.vue`** : Stub prêt à lire l'état `lastOrder` du `orderStore`.

---

### 3.4. Système de Design Global & Reset CSS (`src/assets/styles/main.css`)

#### Problématique
Le fichier `src/style.css` fourni par Vite incluait des règles restrictives (`#app { max-width: 1126px; margin: 0 auto; text-align: center; }`, etc.) qui cassaient les maquettes du restaurant *Le Premium*.

#### Solution implémentée
1. Création d'un Design System complet dans `src/assets/styles/main.css` :
   * **Variables CSS sémantiques** :
     * `--primary` (`#e67e22`), `--primary-hover` (`#d35400`), `--primary-light` (`#fef5ec`)
     * `--secondary` (`#2c3e50`), `--secondary-hover` (`#1a252f`)
     * `--accent` (`#27ae60`), `--danger` (`#e74c3c`)
     * `--bg-main` (`#f8fafc`), `--bg-card` (`#ffffff`)
     * `--text-main` (`#1e293b`), `--text-muted` (`#64748b`)
     * Rayons de bordure (`--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-full`)
     * Ombres portées (`--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-hover`)
   * **CSS Reset standard** (`*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }`).
   * **Classes utilitaires réutilisables** :
     * `.container` (largeur max 1200px, centré, padding adaptatif)
     * `.btn`, `.btn-primary`, `.btn-secondary`, `.btn-outline`, `.btn-danger`, `.btn-sm`, `.btn-lg`
     * `.badge`, `.badge-primary`, `.badge-success`
     * `.card` (fond blanc, bordure douce, ombre et effet hover)
     * `.form-group`, `.form-label`, `.form-control` (avec focus outline ambré)
2. Nettoyage de `src/style.css` pour rediriger proprement vers `main.css`.

---

### 3.5. Point d'entrée et Composant Racine (`main.js` & `App.vue`)

#### Modifications apportées
* **`src/main.js`** : Nettoyé de tout code de test commenté. Il instancie `createPinia()`, monte le routeur `router`, importe globalement `@/assets/styles/main.css` et monte l'application sur `#app`.
* **`src/App.vue`** : Débarrassé du boilerplate `HelloWorld.vue`. Il contient maintenant le conteneur principal avec `<router-view />` et la structure prête à accueillir la `<Navbar />` et le `<Footer />` :

```vue
<template>
  <div id="restaurant-app">
    <!-- Emplacement Navbar -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- Emplacement Footer -->
  </div>
</template>

<script setup>
// Composant racine de l'application
</script>

<style scoped>
#restaurant-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
```

---

## 4. Architecture & Flux de Données

```
+---------------------------------------------------------------------------------+
|                                 NAVIGATEUR CLIENT                               |
|                                                                                 |
|  [ Vues (Home, Menu, ProductDetails, Cart, Confirmation) ]                      |
|                           |                           ^                         |
|                           v                           |                         |
|  [ Composants (Navbar, ProductCard, CategoryFilter, CartItem, PromoBanner) ]    |
|                           |                                                     |
|                           v                                                     |
|  [ Pinia Stores : menuStore | cartStore | orderStore ]                          |
|                           |                                                     |
|                           v                                                     |
|  [ Service HTTP : src/services/api.js (fetch('/api/...')) ]                     |
+---------------------------|-----------------------------------------------------+
                            | Requête HTTP
                            v
+---------------------------------------------------------------------------------+
|                       SERVEUR VITE (Port 5173 - Dev Proxy)                      |
|                  Redirige automatiquement /api/* vers :3000                    |
+---------------------------|-----------------------------------------------------+
                            | Proxy Pass
                            v
+---------------------------------------------------------------------------------+
|                       SERVEUR BACKEND (Node.js / Express :3000)                |
|                                                                                 |
|  - GET  /api/products      -> Lecture de api/products.json                      |
|  - GET  /api/products/:id  -> Filtre par ID                                     |
|  - POST /api/orders        -> Écriture atomique dans api/orders.json            |
+---------------------------------------------------------------------------------+
```

---

## 5. Guide de Démarrage Rapide pour les Développeurs

Pour lancer l'environnement complet en local :

### 1. Démarrer le serveur Backend (Terminal 1)
```bash
npm run server
```
*Le serveur démarrera sur `http://localhost:3000` et affichera :*  
`✅ Serveur backend démarré sur http://localhost:3000`

### 2. Démarrer le serveur Frontend (Terminal 2)
```bash
npm run dev
```
*Vite démarrera sur `http://localhost:5173`.*

### 3. Tester la compilation de production
```bash
npm run build
```
*Le bundler doit compiler les 47 modules et générer le dossier `dist/` sans avertissement ni erreur.*

---

## 6. Matrice des Responsabilités & Prochaines Étapes

Grâce à cette base stabilisée, chaque membre de l'équipe peut désormais intervenir sur ses fichiers sans risquer de bloquer les autres :

| Membre | Rôle | Fichiers cibles | Prochaine action |
| :--- | :--- | :--- | :--- |
| **Membre 1** | Layout & Thème | `src/components/Navbar.vue`<br>`src/components/Footer.vue`<br>`src/components/PromoBanner.vue` | Implémenter la Navbar (avec badge panier branché sur `cartStore.totalCount`), le Footer et la bannière promo. Les insérer dans `App.vue`. |
| **Membre 2** | Accueil & Vitrine | `src/views/client/Home.vue`<br>`src/assets/images/` | Intégrer la bannière Hero, les 3 plats vedettes et le bouton d'appel à l'action vers le Menu. |
| **Membre 3** | Catalogue & Filtres | `src/views/client/Menu.vue`<br>`src/components/CategoryFilter.vue`<br>`src/components/ProductCard.vue` | Câbler `menuStore.filteredProducts`, les boutons de catégories et la grille responsive des cartes de plats. |
| **Membre 4** | Fiche Produit | `src/views/client/ProductDetails.vue` | Récupérer le plat via `menuStore.fetchProductById(route.params.id)`, gérer le sélecteur `+ / -` et l'action `cartStore.addItem`. |
| **Membre 5** | Panier & Confirmation | `src/views/client/Cart.vue`<br>`src/components/CartItem.vue`<br>`src/views/client/OrderConfirmation.vue` | Afficher la liste des articles du panier, le formulaire `Nom` + `Table`, soumettre via `orderStore.submitOrder` et afficher le reçu personnalisé. |
| **Membre 6 (Lead)** | Architecture & Intégration | `src/stores/`, `api/server.js`, `src/services/api.js` | Maintenir la cohérence globale, accompagner l'équipe lors des tests de bout en bout et valider les écritures dans `api/orders.json`. |

