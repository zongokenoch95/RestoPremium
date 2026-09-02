<template>
  <div id="restaurant-app">
    <!-- Navbar (sera insérée dès sa création) -->
    <main class="main-content">
      <router-view />
    </main>
    <!-- Footer (sera inséré dès sa création) -->
  </div>
</template>

<script setup>
// Composant racine de l'application
</script>

<style scoped>
#restaurant-app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
}
</style>
