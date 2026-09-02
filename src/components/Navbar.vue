<template>
  <header class="navbar">
    <div class="container navbar-container">
      <!-- 1. Logo de la Maison (Gauche) -->
      <router-link to="/" class="navbar-brand">
        <span class="brand-text">Le Premium</span>
      </router-link>

      <!-- 2. Navigation centrée -->
      <nav class="navbar-nav">
        <router-link to="/" class="nav-link" exact-active-class="active">Home</router-link>
        <router-link to="/menu" class="nav-link" active-class="active">Menu</router-link>
      </nav>

      <!-- 3. Sac / Panier minimaliste (Droite) -->
      <div class="navbar-actions">
        <router-link to="/cart" class="cart-btn" aria-label="Consulter mon panier">
          <svg class="cart-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <span class="cart-badge" :class="{ 'has-items': cartStore.totalCount > 0 }">
            {{ cartStore.totalCount }}
          </span>
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useCartStore } from '@/stores/cartStore'

const cartStore = useCartStore()
</script>

<style scoped>
.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  background-color: rgba(13, 13, 13, 0.92);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 80px;
}

/* Logo "Le Premium" en italique sérif doré */
.navbar-brand {
  text-decoration: none;
}

.brand-text {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--primary-gold);
  letter-spacing: 0.5px;
  transition: opacity var(--transition-fast);
}

.brand-text:hover {
  opacity: 0.9;
}

/* Liens centraux */
.navbar-nav {
  display: flex;
  align-items: center;
  gap: 2.5rem;
}

.nav-link {
  color: #e5e5e5;
  font-size: 0.95rem;
  font-weight: 500;
  text-decoration: none;
  padding: 0.4rem 0;
  position: relative;
  transition: color var(--transition-fast);
}

.nav-link:hover {
  color: var(--primary-gold);
}

/* Soulignement doré actif */
.nav-link.active {
  color: var(--text-white);
  font-weight: 600;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--primary-gold);
  border-radius: 1px;
}

/* Bouton Sac / Panier */
.navbar-actions {
  display: flex;
  align-items: center;
}

.cart-btn {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-white);
  padding: 0.5rem;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.cart-btn:hover {
  color: var(--primary-gold);
  transform: scale(1.05);
}

.cart-svg {
  width: 24px;
  height: 24px;
}

/* Badge minimaliste */
.cart-badge {
  position: absolute;
  top: 0;
  right: -4px;
  background-color: #e11d48; /* Teinte rose-rouge de la capture */
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 700;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border-radius: var(--radius-full);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-dark);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
}

@media (max-width: 640px) {
  .navbar-container {
    height: 70px;
  }
  .brand-text {
    font-size: 1.4rem;
  }
  .navbar-nav {
    gap: 1.5rem;
  }
}
</style>
