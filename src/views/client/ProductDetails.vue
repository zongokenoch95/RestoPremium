<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// 1. Permet de lire les paramètres d'URL ($route.params.id)
const route = useRoute()
const plat = ref(null)
const quantite = ref(1)

// Fausses données temporaires
const products = [
  {
    id: 1,
    nom: 'Poulet Braisé',
    categorie: 'Plats',
    description: 'Poulet mariné aux épices locales et grillé au feu de bois. Servi avec des bananes aloco ou du riz.',
    ingredients: ['Poulet', 'Oignons', 'Piment', 'Ail', 'Gingembre', 'Épices maison'],
    prix: 15,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500'
  },
  {
    id: 2,
    nom: 'Salade César',
    categorie: 'Entrées',
    description: 'Salade croquante, blanc de poulet grillé, croutons dorés, parmesan et sauce césar maison.',
    ingredients: ['Laitue', 'Poulet', 'Parmesan', 'Croutons', 'Sauce César'],
    prix: 8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500'
  }
]

onMounted(() => {
  // Récupération de l'id du plat depuis l'URL
  const productId = Number(route.params.id)
  plat.value = products.find(p => p.id === productId) || products[0]
})

const ajouterAuPanier = () => {
  console.log(`Ajouté au panier : ${quantite.value} x ${plat.value.nom}`)
}
</script>

<template>
  <div class="details-page" v-if="plat">
    <RouterLink to="/menu" class="back-link">← Retour au menu</RouterLink>

    <div class="details-container">
      <img :src="plat.image" :alt="plat.nom" class="details-image" />

      <div class="details-content">
        <span class="category">{{ plat.categorie }}</span>
        <h1>{{ plat.nom }}</h1>
        <p class="price">{{ plat.prix }} €</p>
        <p class="description">{{ plat.description }}</p>

        <div class="ingredients-section" v-if="plat.ingredients">
          <h3>Ingrédients :</h3>
          <ul>
            <li v-for="(item, index) in plat.ingredients" :key="index">{{ item }}</li>
          </ul>
        </div>

        <div class="actions">
          <div class="quantity-selector">
            <button @click="quantite > 1 && quantite--" :disabled="quantite <= 1">-</button>
            <span>{{ quantite }}</span>
            <button @click="quantite++">+</button>
          </div>

          <button @click="ajouterAuPanier" class="btn-add">
            Ajouter au panier ({{ plat.prix * quantite }} €)
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.details-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 24px 16px;
}

.back-link {
  display: inline-block;
  margin-bottom: 20px;
  color: #4a5568;
  text-decoration: none;
  font-weight: 500;
}

.details-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 32px;
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .details-container {
    grid-template-columns: 1fr;
  }
}

.details-image {
  width: 100%;
  height: 350px;
  object-fit: cover;
  border-radius: 8px;
}

.category {
  font-size: 0.875rem;
  color: #e53e3e;
  text-transform: uppercase;
  font-weight: bold;
}

.price {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2b6cb0;
  margin: 12px 0;
}

.description {
  color: #4a5568;
  line-height: 1.6;
}

.ingredients-section {
  margin: 20px 0;
}

.ingredients-section ul {
  padding-left: 20px;
  color: #718096;
}

.actions {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 24px;
}

.quantity-selector {
  display: flex;
  align-items: center;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
}

.quantity-selector button {
  padding: 8px 12px;
  border: none;
  background: none;
  cursor: pointer;
  font-size: 1.2rem;
}

.quantity-selector span {
  padding: 0 12px;
  font-weight: bold;
}

.btn-add {
  flex-grow: 1;
  padding: 12px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
}

.btn-add:hover {
  background-color: #c53030;
}
</style>