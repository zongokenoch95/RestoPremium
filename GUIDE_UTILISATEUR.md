# 📖 Guide Utilisateur – RestoPremium (Le Premium)

> **Application de commande sur table – Haute Gastronomie Sahélienne & Afro-Gourmet**  
> Ce document accompagne l'application et détaille les étapes d'utilisation pour les clients à table ainsi que pour l'équipe en cuisine.

---

## 📑 Table des Matières

1. [Présentation Générale](#1-présentation-générale)
2. [Démarrage Rapide du Système](#2-démarrage-rapide-du-système)
3. [Parcours Client (Commande sur Table)](#3-parcours-client-commande-sur-table)
   * [3.1. Page d'Accueil (`/`)](#31-page-daccueil-)
   * [3.2. Consultation de la Carte & Filtres (`/menu`)](#32-consultation-de-la-carte--filtres-menu)
   * [3.3. Fiche Détaillée d'un Plat (`/product/:id`)](#33-fiche-détaillée-dun-plat-productid)
   * [3.4. Gestion du Panier & Validation (`/cart`)](#34-gestion-du-panier--validation-cart)
   * [3.5. Reçu et Confirmation de Commande (`/confirmation`)](#35-reçu-et-confirmation-de-commande-confirmation)
4. [Parcours Équipe Cuisine & Back-Office](#4-parcours-équipe-cuisine--back-office)
   * [4.1. Écran KDS en Direct (`/kitchen`)](#41-écran-kds-en-direct-kitchen)
   * [4.2. Historique des Commandes Servies (`/kitchen/history`)](#42-historique-des-commandes-servies-kitchenhistory)
5. [F.A.Q & Bonnes Pratiques](#5-faq--bonnes-pratiques)

---

## 1. Présentation Générale

**RestoPremium** est une solution web tactile et réactive conçue pour fluidifier l'expérience au restaurant :
* **Côté Client :** Les clients consultent le menu depuis leur smartphone ou une tablette fixée à leur table, personnalisent leur commande et l'envoient instantanément en cuisine sans attendre le serveur.
* **Côté Cuisine (KDS) :** Les cuisiniers reçoivent les bons de commande en temps réel avec le numéro de table, le récapitulatif des plats et les notes spéciales (allergies, cuisson).

---

## 2. Démarrage Rapide du Système

Pour accéder aux interfaces, assurez-vous que les deux serveurs sont démarrés :

```bash
# 1. Démarrer le serveur API Backend (Port 3000)
node api/server.js

# 2. Démarrer l'interface Frontend Vite (Port 5173)
npm run dev
```

* **Interface Client :** http://localhost:5173/
* **Interface Cuisine :** http://localhost:5173/kitchen

---

## 3. Parcours Client (Commande sur Table)

### 3.1. Page d'Accueil (`/`)
* **Bannière Hero :** Présente le restaurant et propose un bouton direct *« Consulter le menu »*.
* **Plats Vedettes :** Affiche une sélection de créations signatures du Chef (Poulet braisé, Thiéboudienne, Mafé). Vous pouvez cliquer sur un plat pour en voir la fiche ou sur *« + Ajouter »* pour le placer directement dans le panier.
* **Bannière Événements & Promotions :** Met en avant les offres spéciales en cours.
* **Navbar fixe :** Présente le logo, les liens rapides et le **badge du panier** qui s'incrémente en temps réel à chaque ajout.

---

### 3.2. Consultation de la Carte & Filtres (`/menu`)
* **Barre de Catégories :** Cliquez sur l'un des filtres pour affiner instantanément l'affichage :
  * **Tous** : Affiche l'intégralité du catalogue (18 spécialités).
  * **Entrées** : Salade composée, Alloco...
  * **Plats** : Poulet braisé, Thiéboudienne, Foutou sauce graine, Riz gras, Mafé, Spaghetti...
  * **Desserts** : Glaces artisanales, Salade de fruits, Crêpes, Milk Shake...
  * **Boissons** : Jus de Bissap, Gingembre maison (Gnamakoudji), Orangina, Brakina, Beaufort, Schweppes...
* **Cartes de plats :** Chaque carte indique le nom, la photo, la description, le prix en FCFA et un bouton d'ajout direct.

---

### 3.3. Fiche Détaillée d'un Plat (`/product/:id`)
En cliquant sur l'image ou le titre d'un plat :
1. Vous accédez à la vue détaillée avec une grande photo haute résolution.
2. Un sélecteur de quantité numérique (**`-`** et **`+`**) permet de définir le nombre de portions désirées.
3. Le montant total calculé s'actualise immédiatement.
4. Cliquez sur **« Ajouter au panier »** pour confirmer. Une confirmation visuelle apparaît et le badge de la barre de navigation se met à jour.

---

### 3.4. Gestion du Panier & Validation (`/cart`)
Accédez au panier à tout moment en cliquant sur l'icône du sac en haut à droite.

1. **Vérification des articles :**
   * Modifiez les quantités en direct ou supprimez un article via l'icône corbeille.
   * Le sous-total par article et le total général se recalculent automatiquement.
2. **Formulaire de Commande sur Table :**
   * **Nom du client :** Saisissez votre nom ou prénom (ex: *M. Zongo*).
   * **Numéro de table :** Renseignez le numéro figurant sur le chevalet de votre table (ex: *12*).
   * **Instructions spéciales (optionnel) :** Indiquez vos préférences (ex: *« Sauce piment à part »*, *« Sans oignons »*, *« Cuisson bien cuite »*).
3. **Validation :**
   * Cliquez sur **« Passer la commande → »**.
   * La commande est transmise instantanément au serveur backend et enregistrée dans le système.
   * Votre panier est automatiquement réinitialisé.

---

### 3.5. Reçu et Confirmation de Commande (`/confirmation`)
Dès l'envoi, l'écran de confirmation s'affiche :
* **Message personnalisé :** *« Merci [Votre Nom] ! Votre commande arrive à la Table n°[X] »*.
* **Numéro de référence unique :** Référence de commande horodatée pour le suivi avec les serveurs.
* **Récapitulatif complet :** Liste des plats commandés, quantités et montant total réglé/dû en FCFA.
* **Bouton « Retour au menu » :** Permet de recommander des boissons ou desserts supplémentaires au cours du repas.

---

## 4. Parcours Équipe Cuisine & Back-Office

### 4.1. Écran KDS en Direct (`/kitchen`)
Conçu pour être affiché sur un écran tactile ou une tablette en cuisine :
* **Mise à jour en temps réel :** L'écran interroge automatiquement l'API toutes les 5 secondes pour afficher les nouvelles commandes sans rechargement de page.
* **Fiches de commande :**
  * Badge doré avec le **Numéro de table**.
  * Heure exacte de la commande et référence.
  * Nom du client.
  * Liste des plats avec quantités en surbrillance dorée.
  * Bloc rouge d'alerte pour les **instructions spéciales et allergies**.
  * Total de la commande.
* **Action « Marquer comme prête » :**
  * Dès que le chef a préparé la commande, il clique sur le bouton vert **« Marquer comme prête »**.
  * La commande quitte immédiatement la liste active et est archivée dans l'historique.

---

### 4.2. Historique des Commandes Servies (`/kitchen/history`)
* Permet aux responsables de salle et au gérant de consulter l'ensemble des commandes terminées avec leur heure d'achèvement (`completedAt`) et le total encaissé.

---

## 5. F.A.Q & Bonnes Pratiques

* **Comment modifier une commande déjà envoyée ?**  
  Une commande validée est immédiatement transmise en cuisine. Pour toute modification ultérieure, veuillez vous adresser directement au personnel de salle.
* **Que faire si la connexion est interrompue ?**  
  L'application dispose d'un système de gestion d'erreur visuel (`error-banner`) qui avertit l'utilisateur si le serveur ne répond pas.
* **La commande fonctionne-t-elle sur smartphone ?**  
  Oui, l'interface est 100% responsive et s'adapte à toutes les tailles d'écrans (smartphones, tablettes, ordinateurs de caisse).
