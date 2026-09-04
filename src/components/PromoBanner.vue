<script setup>
import event1Bg from '@/assets/images/event.jpg'
import event2Bg from '@/assets/images/event2.jpg'
</script>

<template>
  <section class="events-grid">
    <!-- 1er Événement -->
    <div 
      class="promo-banner" 
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${event1Bg})` }"
    >
      <div class="promo-content">
        <span class="promo-badge">ÉVÉNEMENT SPÉCIAL</span>
        <h2>Soirée Dégustation & Musique Live</h2>
        <p>Rejoignez-nous chaque vendredi pour découvrir nos accords mets-vins exclusifs animés par des artistes locaux.</p>
      </div>
    </div>

    <!-- 2ème Événement -->
    <div 
      class="promo-banner" 
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${event2Bg})` }"
    >
      <div class="promo-content">
        <span class="promo-badge">RENDEZ-VOUS GOURMAND</span>
        <h2>Brunch Acoustique du Dimanche</h2>
        <p>Profitez d'un moment chaleureux en famille ou entre amis autour de notre buffet varié et d'une douce ambiance musicale.</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 30px;
  max-width: 1200px;
  margin: 60px auto;
  padding: 0 20px;
}

.promo-banner {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 50px 30px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
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
  font-size: 1.8rem;
  margin: 20px 0 10px;
}

.promo-banner p {
  color: #a0a0a0;
  font-size: 0.95rem;
  line-height: 1.5;
  margin: 0;
}
</style>