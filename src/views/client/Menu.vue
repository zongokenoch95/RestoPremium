<script setup>
import { onMounted, computed } from 'vue'
import { useMenuStore } from './menuStore.js'
import CategoryFilter from '../../components/CategoryFilter.vue'
import ProductCard from '../../components/ProductCard.vue'

const menuStore = useMenuStore()

// Liste des catégories pour les filtres
const categories = ['Tous', 'Entrées & Tapas Sahel', 'Plats Signatures', 'Desserts du Terroir', 'Nectars & Boissons Locales']

// Chargement des données au montage du composant
onMounted(() => {
  if (menuStore.products.length === 0) {
    menuStore.fetchProducts()
  }
})

// Changement de catégorie via le Store Pinia
const handleCategoryChange = (category) => {
  menuStore.setCategory(category)
}

// Récupération des produits filtrés du store
const filteredProducts = computed(() => menuStore.filteredProducts)
</script>

<template>
  <div class="menu-page">
    <section class="menu-header">
      <h1 class="page-title">Notre Carte</h1>
      <p class="subtitle">
        Découvrez l'excellence afro-gourmande. Une fusion subtile entre héritage traditionnel et haute gastronomie contemporaine.
      </p>
    </section>

    <!-- Composant de Filtres -->
    <CategoryFilter
      :categories="categories"
      :activeCategory="menuStore.selectedCategory"
      @select-category="handleCategoryChange"
    />

    <!-- Grille des Produits -->
    <div class="products-grid">
      <ProductCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- Section Promotions & Événements (Pied de page de la maquette) -->
    <section class="promo-section">
      <h2 class="promo-title">Promotions & Événements</h2>
      <div class="promo-divider"></div>

     

<!-- Dans src/views/client/Menu.vue -->
<div class="promo-cards">
  <div class="promo-card">
    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4" alt="Soirée Dégustation Royale" />
    <div class="promo-content">
      <h3>Soirée Dégustation Royale</h3>
      <p>Une immersion sensorielle dans la haute gastronomie sahélienne avec notre Chef Signature.</p>
    </div>
  </div>

  <div class="promo-card">
    <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c" alt="Offre Étoilée" />
    <div class="promo-content">
      <h3>Offre Étoilée</h3>
      <p>Découvrez nos créations exclusives avec un accord mets & nectars offert chaque jeudi.</p>
    </div>
  </div>
</div>
    </section>
  </div>
</template>

<style scoped>
.menu-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.menu-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.5rem;
  color: #52030c;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #999;
  max-width: 600px;
  margin: 0 auto;
  font-size: 0.95rem;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
  margin-bottom: 5rem;
}

/* Styles Section Promo */
.promo-section {
  margin-top: 4rem;
  text-align: center;
}

.promo-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  color: #560505;
}

.promo-divider {
  width: 60px;
  height: 2px;
  background-color: #d4af37;
  margin: 0.5rem auto 2rem auto;
}

.promo-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.promo-card {
  background-color: #121212;
  border: 1px solid #222;
  border-radius: 8px;
  overflow: hidden;
  text-align: left;
}

.promo-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.promo-content {
  padding: 1.2rem;
}

.promo-content h3 {
  color: #d4af37;
  font-family: 'Playfair Display', serif;
  margin-bottom: 0.5rem;
}

.promo-content p {
  color: #888;
  font-size: 0.85rem;
}
</style>