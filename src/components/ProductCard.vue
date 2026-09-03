<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const addToCart = () => {
  cartStore.addItem(props.product)
}
</script>

<template>
  <div class="product-card">
    <div class="image-container">
      <img :src="product.image" :alt="product.name" />
      <span v-if="product.tag" class="tag">{{ product.tag }}</span>
    </div>
    
    <div class="card-body">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-description">{{ product.description }}</p>
      
      <div class="card-footer">
        <span class="product-price">{{ product.price.toLocaleString() }} FCFA</span>
        <button class="btn-add" @click="addToCart">+ Ajouter</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: #121212;
  border: 1px solid #2a2a2a;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

.product-card:hover {
  transform: translateY(-4px);
  border-color: #d4af37;
}

.image-container {
  position: relative;
  height: 200px;
  width: 100%;
}

.image-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.tag {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: rgba(0, 0, 0, 0.7);
  color: #ccc;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 0.75rem;
}

.card-body {
  padding: 1.2rem;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-title {
  color: #f5f5f5;
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.product-description {
  color: #a0a0a0;
  font-size: 0.875rem;
  line-height: 1.4;
  margin-bottom: 1.5rem;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  color: #d4af37;
  font-weight: bold;
  font-size: 1.1rem;
}

.btn-add {
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 6px 14px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}

.btn-add:hover {
  background-color: #d4af37;
  color: #000;
}
</style>