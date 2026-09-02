<script setup>
import { ref } from 'vue'
import PromoBanner from '@/components/PromoBanner.vue'
import ProductCard from '@/components/ProductCard.vue'

// Plats vedettes pour la page d'accueil
const featuredProducts = ref([
  {
    id: 1,
    name: 'Poulet Bicyclette Braisé aux Épices Nobles',
    price: 12500,
    description: 'Élevé en plein air, mariné 24h dans un mélange secret d’épices de l’Afrique de l’Ouest.',
    image: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?w=500'
  },
  {
    id: 2,
    name: 'Riz Gras Royal au Jarret d’Agneau',
    price: 18000,
    description: 'Riz parfumé cuit dans un bouillon riche, accompagné d’un jarret d’agneau fondant.',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500'
  },
  {
    id: 3,
    name: 'Tartelette au Dêgê & Mangue Flambée',
    price: 8500,
    description: 'Une réinterprétation audacieuse du classique : crème légère au petit mil et mangues.',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=500'
  }
])
</script>

<template>
  <div class="home-page">
    <!-- Hero Banner -->
    <section class="hero-section">
      <div class="hero-overlay">
        <span class="sub-title">HAUTE GASTRONOMIE SAHÉLIENNE</span>
        <h1>L'Art Culinaire Burkinabè Sublimé</h1>
        <p>Une expérience sensorielle inédite où la tradition ancestrale rencontre l'élégance contemporaine.</p>
        <RouterLink to="/menu" class="btn-primary">CONSULTER LE MENU</RouterLink>
      </div>
    </section>

    <!-- Plats Vedettes -->
    <section class="featured-section">
      <div class="section-header">
        <h2>Plats Vedettes</h2>
        <RouterLink to="/menu" class="see-all">VOIR TOUT LE MENU →</RouterLink>
      </div>
      <div class="featured-grid">
        <ProductCard 
          v-for="product in featuredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
    </section>

    <!-- Section Promotions & Événements -->
    <PromoBanner />
  </div>
</template>

<style scoped>
.home-page {
  background-color: #0d0d0d;
  color: #ffffff;
  min-height: 100vh;
}

.hero-section {
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(13, 13, 13, 1)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.sub-title {
  color: #c5a059;
  font-size: 0.85rem;
  letter-spacing: 2px;
  font-weight: 600;
}

.hero-overlay h1 {
  font-size: 3rem;
  margin: 15px 0;
  font-family: serif;
}

.hero-overlay p {
  max-width: 600px;
  margin: 0 auto 30px;
  color: #cccccc;
}

.btn-primary {
  background-color: #c5a059;
  color: #000000;
  padding: 12px 28px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 2px;
  letter-spacing: 1px;
}

.featured-section {
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.see-all {
  color: #c5a059;
  text-decoration: none;
  font-size: 0.9rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
</style>