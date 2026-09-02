<script setup>
defineProps({
  selectedCategory: {
    type: String,
    default: 'Tous'
  }
})

defineEmits(['select-category'])

const categories = ['Tous', 'Entrées', 'Plats', 'Desserts', 'Boissons']
</script>

<template>
  <div class="category-filter">
    <button
      v-for="cat in categories"
      :key="cat"
      :class="['filter-btn', { active: selectedCategory === cat }]"
      @click="$emit('select-category', cat)"
    >
      {{ cat }}
    </button>
  </div>
</template>

<style scoped>
.category-filter {
  display: flex;
  gap: 10px;
  justify-content: center;
  flex-wrap: wrap;
  margin: 20px 0;
}

.filter-btn {
  padding: 8px 16px;
  border: 1px solid #cbd5e0;
  border-radius: 20px;
  background-color: #ffffff;
  color: #4a5568;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.filter-btn.active {
  background-color: #e53e3e;
  color: #ffffff;
  border-color: #e53e3e;
}
</style>