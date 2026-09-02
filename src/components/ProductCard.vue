<template>
  <div class="product-card">
    <!-- Image cliquable vers les détails -->
    <div class="product-image-container" @click="goToDetails">
      <img :src="productImage" :alt="product.name" class="product-image" loading="lazy" />
      <span v-if="product.tag" class="product-tag">{{ product.tag }}</span>
    </div>

    <!-- Contenu du plat -->
    <div class="product-info">
      <div class="product-header">
        <h3 class="product-title" @click="goToDetails">{{ product.name }}</h3>
        <span v-if="product.rating" class="product-rating">★ {{ product.rating }}</span>
      </div>

      <p class="product-desc">{{ product.description }}</p>

      <!-- Pied de carte : Prix + Bouton Ajouter -->
      <div class="product-footer">
        <span class="product-price">{{ formatPrice(product.price) }} FCFA</span>
        <button 
          class="btn-add" 
          :class="{ 'added': isJustAdded }"
          @click.stop="handleAddToCart"
          aria-label="Ajouter au panier"
        >
          {{ isJustAdded ? 'Ajouté ✓' : '+ Ajouter' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '@/stores/cartStore'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const router = useRouter()
const cartStore = useCartStore()
const isJustAdded = ref(false)

// Résolution de l'image (URL externe ou chemin local)
const productImage = computed(() => {
  if (!props.product.image) {
    return 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80'
  }
  if (props.product.image.startsWith('http')) {
    return props.product.image
  }
  return `/images/${props.product.image}`
})

function formatPrice(price) {
  if (!price) return '0'
  return new Intl.NumberFormat('fr-FR').format(price)
}

function goToDetails() {
  router.push(`/product/${props.product.id}`)
}

function handleAddToCart() {
  cartStore.addItem(props.product, 1)
  isJustAdded.value = true
  setTimeout(() => {
    isJustAdded.value = false
  }, 1200)
}
</script>

<style scoped>
.product-card {
  background-color: #141414;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform var(--transition-normal), border-color var(--transition-normal);
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: rgba(212, 163, 75, 0.4);
}

.product-image-container {
  position: relative;
  width: 100%;
  height: 220px;
  overflow: hidden;
  cursor: pointer;
  background-color: #1c1c1c;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-tag {
  position: absolute;
  bottom: 12px;
  left: 12px;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
  color: #d1d5db;
  font-size: 0.75rem;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
}

.product-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.product-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.product-title {
  font-family: var(--font-serif);
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-white);
  cursor: pointer;
  transition: color var(--transition-fast);
}

.product-title:hover {
  color: var(--primary-gold);
}

.product-rating {
  color: var(--primary-gold);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
}

.product-desc {
  color: #a3a3a3;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.5rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.product-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.product-price {
  font-family: var(--font-serif);
  font-weight: 600;
  font-size: 1.15rem;
  color: var(--text-white);
}

.btn-add {
  background: transparent;
  border: 1px solid rgba(212, 163, 75, 0.4);
  color: var(--text-white);
  padding: 0.45rem 1rem;
  border-radius: 4px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.btn-add:hover {
  border-color: var(--primary-gold);
  color: var(--primary-gold);
  background-color: var(--primary-gold-dim);
}

.btn-add.added {
  background-color: var(--primary-gold);
  border-color: var(--primary-gold);
  color: #0d0d0d;
  font-weight: 700;
}
</style>

