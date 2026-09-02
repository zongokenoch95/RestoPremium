<script setup>
import { ref, computed } from 'vue'
import ProductCard from '@/components/ProductCard.vue'
import CategoryFilter from '@/components/CategoryFilter.vue'

// 1. Catégorie actuellement sélectionnée
const currentCategory = ref('Tous')

// 2. Liste temporaire des plats (fausses données en attendant le store de Dev 5)
const products = ref([
  {
    id: 1,
    nom: 'Poulet Braisé',
    categorie: 'Plats',
    description: 'Poulet mariné aux épices locales et grillé au feu de bois.',
    prix: 15,
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500'
  },
  {
    id: 2,
    nom: 'Salade César',
    categorie: 'Entrées',
    description: 'Salade croquante, blanc de poulet, parmesan et sauce césar.',
    prix: 8,
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500'
  },
  {
    id: 3,
    nom: 'Tiramisu Maison',
    categorie: 'Desserts',
    description: 'Dessert italien classique au café et mascarpone.',
    prix: 6,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500'
  },
  {
    id: 4,
    nom: 'Jus de Bissap',
    categorie: 'Boissons',
    description: 'Boisson rafraîchissante à la fleur d\'hibiscus et menthe.',
    prix: 3,
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=500'
  }
])

// 3. Filtrage dynamique selon la catégorie choisie
const filteredProducts = computed(() => {
  if (currentCategory.value === 'Tous') {
    return products.value
  }
  return products.value.filter(p => p.categorie === currentCategory.value)
})

// 4. Fonction déclenchée au changement de filtre
const handleCategorySelect = (category) => {
  currentCategory.value = category
}

// 5. Transmettre l'ajout au panier
const handleAddToCart = (plat) => {
  console.log('Plat ajouté au panier :', plat)
  // Dev 3 et Dev 5 connecteront leur store ici plus tard
}
</script>

<template>
  <div class="menu-page">
    <h1 class="page-title">Notre Carte</h1>

    <!-- Composant de filtrage -->
    <CategoryFilter 
      :selected-category="currentCategory"
      @select-category="handleCategorySelect"
    />

    <!-- Grille d'affichage des plats -->
    <div class="products-grid" v-if="filteredProducts.length > 0">
      <ProductCard 
        v-for="plat in filteredProducts" 
        :key="plat.id" 
        :plat="plat"
        @ajouter-au-panier="handleAddToCart"
      />
    </div>

    <!-- Message si aucun plat ne correspond au filtre -->
    <p v-else class="empty-message">Aucun plat disponible dans cette catégorie.</p>
  </div>
</template>

<style scoped>
.menu-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}

.page-title {
  text-align: center;
  color: #2d3748;
  margin-bottom: 24px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 24px;
  margin-top: 24px;
}

.empty-message {
  text-align: center;
  color: #718096;
  margin-top: 40px;
}
</style>