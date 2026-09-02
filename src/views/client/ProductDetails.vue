<template>
  <div class="product-details-view">
    <h1>🔍 Détails du Plat</h1>
    <p>Identifiant sélectionné : {{ id }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  }
})
</script>

<style scoped>
.product-details-view {
  padding: 2rem 1rem;
  text-align: center;
}
</style>

