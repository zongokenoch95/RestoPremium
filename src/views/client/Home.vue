<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import PromoBanner from '@/components/PromoBanner.vue'
import ProductCard from '@/components/ProductCard.vue'

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
    <Navbar />

    <section class="hero-section">
      <div class="hero-overlay">
        <span class="sub-title">HAUTE GASTRONOMIE SAHÉLIENNE</span>
        <h1>L'Art Culinaire Burkinabè Sublimé</h1>
        <p>Une expérience sensorielle inédite où la tradition ancestrale rencontre l'élégance contemporaine.</p>
        <RouterLink to="/menu" class="btn-primary">CONSULTER LE MENU</RouterLink>
      </div>
    </section>

    <section class="featured-section">
      <div class="section-header">
        <div class="header-titles">
          <h2>Plats Vedettes</h2>
          <p class="section-subtitle">Les créations signatures de notre Chef, un voyage gustatif inoubliable.</p>
        </div>
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

    <PromoBanner />

    <Footer />
  </div>
</template>

<style scoped>
.home-page {
  background-color: #0d0d0d;
  color: #ffffff;
  min-height: 100vh;
}

.hero-section {
  height: 85vh;
  background: linear-gradient(rgba(13, 13, 13, 0.5), rgba(13, 13, 13, 0.95)), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200') center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 0 20px;
}

.sub-title {
  color: #c5a059;
  font-size: 0.8rem;
  letter-spacing: 3px;
  font-weight: 600;
  text-transform: uppercase;
}

.hero-overlay h1 {
  font-size: 3.2rem;
  margin: 15px 0;
  font-family: 'Playfair Display', serif;
  color: #f5f5f5;
  font-weight: normal;
}

.hero-overlay p {
  max-width: 650px;
  margin: 0 auto 35px;
  color: #b0b0b0;
  font-size: 0.95rem;
  line-height: 1.6;
}

.btn-primary {
  background-color: #c5a059;
  color: #0d0d0d;
  padding: 12px 30px;
  text-decoration: none;
  font-weight: bold;
  border-radius: 2px;
  letter-spacing: 1.5px;
  font-size: 0.85rem;
  transition: background-color 0.2s;
}

.btn-primary:hover {
  background-color: #d4af37;
}

.featured-section {
  max-width: 1200px;
  margin: 80px auto;
  padding: 0 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 40px;
}

.header-titles h2 {
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  color: #f5f5f5;
  margin-bottom: 8px;
}

.section-subtitle {
  color: #999999;
  font-size: 0.9rem;
}

.see-all {
  color: #c5a059;
  text-decoration: none;
  font-size: 0.85rem;
  letter-spacing: 1px;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 24px;
}
</style>