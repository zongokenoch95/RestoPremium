<script setup>
// 1. defineProps permet de recevoir les infos du plat depuis le composant parent (Menu.vue)
defineProps({
  plat: {
    type: Object,
    required: true
  }
})

// 2. defineEmits prévient le panier (géré par Dev 3) qu'un plat a été cliqué
defineEmits(['ajouter-au-panier'])
</script>

<template>
  <div class="product-card">
    <!-- Image du plat -->
    <img :src="plat.image" :alt="plat.nom" class="product-image" />

    <div class="product-info">
      <!-- Catégorie & Nom -->
      <span class="product-category">{{ plat.categorie }}</span>
      <h3 class="product-title">{{ plat.nom }}</h3>
      
      <!-- Description courte -->
      <p class="product-description">{{ plat.description }}</p>

      <div class="product-footer">
        <!-- Prix -->
        <span class="product-price">{{ plat.prix }} €</span>

        <div class="product-actions">
          <!-- Lien vers la page de détail (ProductDetails.vue) -->
          <RouterLink :to="'/product/' + plat.id" class="btn-details">
            Détails
          </RouterLink>

          <!-- Bouton pour ajouter au panier -->
          <button @click="$emit('ajouter-au-panier', plat)" class="btn-add">
            Ajouter
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.product-info {
  padding: 16px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-category {
  font-size: 0.75rem;
  text-transform: uppercase;
  color: #e53e3e;
  font-weight: bold;
  letter-spacing: 0.05em;
}

.product-title {
  margin: 4px 0 8px 0;
  font-size: 1.25rem;
  color: #2d3748;
}

.product-description {
  font-size: 0.875rem;
  color: #718096;
  margin-bottom: 16px;
  flex-grow: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
}

.product-price {
  font-size: 1.25rem;
  font-weight: bold;
  color: #2b6cb0;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.btn-details {
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 6px;
  color: #4a5568;
  text-decoration: none;
  font-size: 0.875rem;
}

.btn-add {
  padding: 8px 12px;
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 600;
}

.btn-add:hover {
  background-color: #c53030;
}
</style>