<script setup>
import eventBg from '@/assets/images/event.jpg'
</script>

<template>
  <section 
    class="promo-banner" 
    :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${eventBg})` }"
  >
    <div class="promo-content">
      <span class="promo-badge">ÉVÉNEMENT SPÉCIAL</span>
      <h2>Soirée Dégustation & Musique Live</h2>
      <p>Rejoignez-nous chaque vendredi pour découvrir nos accords mets-vins exclusifs animés par des artistes locaux.</p>
      <button class="btn-promo">Réserver une table</button>
    </div>
  </section>
</template>

<style scoped>
.promo-banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  margin: 60px auto;
  padding: 50px 30px;
  text-align: center;
  max-width: 1200px;
}

.promo-content {
  max-width: 700px;
  margin: 0 auto;
}

.promo-badge {
  background-color: #d4af37;
  color: #000;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: bold;
  letter-spacing: 1px;
}

.promo-banner h2 {
  color: #f5f5f5;
  font-family: 'Playfair Display', serif;
  font-size: 2.2rem;
  margin: 20px 0 10px;
}

.promo-banner p {
  color: #a0a0a0;
  font-size: 0.95rem;
  line-height: 1.5;
  margin-bottom: 25px;
}

.btn-promo {
  background-color: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 10px 24px;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-promo:hover {
  background-color: #d4af37;
  color: #000;
}
</style>