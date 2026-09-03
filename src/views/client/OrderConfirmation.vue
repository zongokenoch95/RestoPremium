<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/orderStore'
import PromoBanner from '@/components/PromoBanner.vue'

const orderStore = useOrderStore()
const router = useRouter()

const lastOrder = computed(() => orderStore.lastOrder)

const goToHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="confirmation-page">
    <div class="container">
      
      <!-- Carte de confirmation principale -->
      <div class="confirmation-card" v-if="lastOrder">
        <div class="check-icon">✓</div>
        
        <h1 class="thank-you-title">
          Merci pour votre commande {{ lastOrder.customerName }}
        </h1>
        
        <p class="order-id-badge">COMMANDE #{{ lastOrder.orderId }}</p>
        <p class="table-info">Votre commande sera servie à la Table n°{{ lastOrder.tableNumber }}</p>

        <div class="summary-box">
          <h3 class="summary-title">Récapitulatif de la commande</h3>
          
          <div class="summary-line" v-for="item in lastOrder.items" :key="item.id">
            <span>{{ item.name }} x{{ item.quantity }}</span>
            <span>{{ (item.price * item.quantity).toLocaleString() }} FCFA</span>
          </div>

          <div class="summary-line fee-line" v-if="lastOrder.serviceFee">
            <span>Frais de service</span>
            <span>{{ lastOrder.serviceFee.toLocaleString() }} FCFA</span>
          </div>

          <div class="summary-total">
            <span>Total</span>
            <span class="total-price">{{ lastOrder.total.toLocaleString() }} FCFA</span>
          </div>
        </div>

        <button @click="goToHome" class="btn-return">Retour à l'accueil</button>
      </div>

      <!-- Cas de secours si accès direct sans commande -->
      <div class="confirmation-card" v-else>
        <h2>Aucune commande récente trouvée.</h2>
        <button @click="goToHome" class="btn-return">Retour au menu</button>
      </div>

      <!-- Section Promotions & Événements -->
      <section class="promo-section">
        <PromoBanner />
      </section>

    </div>
  </div>
</template>

<style scoped>
.confirmation-page {
  background-color: #0d0d0d;
  color: #fff;
  min-height: 100vh;
  padding: 3rem 1rem;
}

.container {
  max-width: 700px;
  margin: 0 auto;
}

.confirmation-card {
  background-color: #141414;
  border: 1px solid #2a2a2a;
  border-radius: 12px;
  padding: 2.5rem 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
}

.check-icon {
  width: 50px;
  height: 50px;
  border: 1px solid #d4af37;
  border-radius: 50%;
  color: #d4af37;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem auto;
  font-size: 1.5rem;
}

.thank-you-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.order-id-badge {
  color: #888;
  font-size: 0.8rem;
  letter-spacing: 1px;
  margin-bottom: 0.2rem;
}

.table-info {
  color: #a0a0a0;
  font-size: 0.95rem;
  margin-bottom: 2rem;
}

.summary-box {
  background-color: #1a1a1a;
  border-radius: 8px;
  padding: 1.5rem;
  text-align: left;
  margin-bottom: 2rem;
}

.summary-title {
  font-size: 0.9rem;
  color: #aaa;
  margin: 0 0 1rem 0;
  text-align: center;
  border-bottom: 1px solid #282828;
  padding-bottom: 0.5rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
  font-size: 0.95rem;
  color: #ddd;
}

.fee-line {
  color: #888;
  font-size: 0.85rem;
}

.summary-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #282828;
  padding-top: 1rem;
  margin-top: 1rem;
  font-weight: bold;
  font-size: 1.1rem;
}

.total-price {
  color: #d4af37;
  font-size: 1.3rem;
}

.btn-return {
  background: transparent;
  border: 1px solid #d4af37;
  color: #d4af37;
  padding: 0.75rem 2rem;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-return:hover {
  background-color: #d4af37;
  color: #000;
}

.promo-section {
  margin-top: 5rem;
}
</style>